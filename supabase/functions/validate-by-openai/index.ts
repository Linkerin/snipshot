import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * A prompt describing how ChatGPT should act himself.
 */
const roleDescription = `
Act as a content moderator. You are working for the website https://snipshot.dev:
a platform where people can post their code snippets in different programming languages.
Reply only with a JSON in the following structure: {
  reported: boolean, // \`true\` if you as a moderator consider the code snippet inappropriate, otherwise - \`false\`
  reason: string, // a short descriptions (no more than 256 symbols) explaining why you decided that the snippet was inappropriate
  snippetId: string // snippetId from the input data.
}.
Do not add any other text as your response will be automatically parsed by \`JSON.parse()\`
You should validate the posts and report whether the posted code snippet was wrong,
harmful, offensive, malicious, defective or  in any other way inappropriate.
You should also consider as inapproprite snippets which titles do not match with the provided code or
when the programming language of the code snippet does not match the language provided in \`lang\` field.
In addition, mark as inappropriate code snippets that can ruin user's data, file system, erase database
or do anything similar.
Here is the code snippet that you should check: `;

interface OpenAIValidateReqParams {
  id: string;
  title: string;
  lang: string;
  snippet: string;
}

/**
 * Makes a request to OpenAI API to check whether the snippet is inappropriate.
 * Get's a snippet object as a parameter.
 * @returns An object with check results
 * @example
 * const snippetCheck = await openAIValidateSnippet(snippetObj);
 */
async function openAIValidateReq(snippetData: OpenAIValidateReqParams) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `${roleDescription} ${JSON.stringify(snippetData)}`
        }
      ]
    })
  });
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  const data = await res.json();

  return data.choices[0].message?.content as string;
}

/**
 * Parses response message from ChatGPT to find inside its' response an object
 * with `reported` and `reason` keys and extract their values.
 * @param text Message from ChatGPT
 * @example
 * const result = parseResponse(messageContent);
 */
function parseOpenAIResponse(text: string) {
  let reason: string | undefined = '';
  const reasonMatch = text.match(/"reason": (.+)\,/);
  if (reasonMatch && reasonMatch[1]) {
    reason = reasonMatch[1].split('"').at(1);
  }

  let reported: boolean | null = null;
  const reportedMatch = text.match(/"reported": (.+)\,/);
  if (reportedMatch && reportedMatch[1]) {
    reported = reportedMatch[1] === 'true';
  }

  return { reported, reason };
}

type validationResult = {
  reported: boolean | null;
  reason: string | undefined;
  snippetId?: string;
};

async function recordValidationResult(result: validationResult) {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );

  if (result.reported === null) {
    const { error } = await supabase
      .from('snippets_validation_results')
      .insert({
        snippet_id: result.snippetId,
        reason: result.reason,
        checked: false
      });
    if (error) throw error;

    return true;
  }

  const { error } = await supabase.from('snippets_validation_results').insert({
    snippet_id: result.snippetId,
    reason: result.reason,
    reported: result.reported
  });
  if (error) throw error;

  return true;
}

serve(async req => {
  try {
    const { record } = await req.json();

    if (!record.title || !record.snippet || !record.lang || !record.id) {
      return new Response(
        JSON.stringify({
          message: 'Title, snippet, language and id are required fields.'
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    const snippetData: OpenAIValidateReqParams = {
      id: record.id,
      title: record.title,
      snippet: record.snippet,
      lang: record.lang
    };

    const responseMsg = await openAIValidateReq(snippetData);

    let result: validationResult;
    if (responseMsg) {
      try {
        result = JSON.parse(responseMsg);
      } catch (err) {
        result = parseOpenAIResponse(responseMsg);
      }

      if (result && !result.snippetId) {
        result.snippetId = record.id;
      }
    } else {
      result = {
        snippetId: record.id,
        reported: null,
        reason: 'No response from OpenAI'
      };
    }

    const recordId = await recordValidationResult(result);
    if (!recordId) throw new Error('Validation results were not recorded');

    return new Response(
      JSON.stringify({ message: 'Open AI validation recorded', recordId }),
      { headers: { 'Content-Type': 'application/json' }, status: 201 }
    );
  } catch (err) {
    const body = {
      message: 'Error occured while performed Open AI validation',
      err
    };
    console.warn(body.message);
    console.warn(err);

    return new Response(JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
      status: 400
    });
  }
});
