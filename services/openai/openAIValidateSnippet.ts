import openai from './openai';
import { SnippetType } from '../types';

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
You should also consider as inapproprite snippets which titles do not match with the provided code.
In addition, mark as inappropriate code snippets that can ruin user's data, file system, erase database
or do anything similar.
Here is the code snippet that you should check: 
`;

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
  console.log(reasonMatch);
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

interface OpenAIValidateSnippetParams {
  id: SnippetType['id'];
  title: SnippetType['title'];
  lang: SnippetType['lang'];
  snippet: SnippetType['snippet'];
}

export type validationResult = {
  reported: boolean | null;
  reason: string | undefined;
  snippetId?: string;
};
/**
 * Makes a request to OpenAI API to check whether the snippet is inappropriate.
 * Get's a snippet object as a parameter.
 * @returns An object with check results
 * @example
 * const snippetCheck = await openAIValidateSnippet(snippetObj);
 */
export default async function openAIValidateSnippet(
  snippet: OpenAIValidateSnippetParams
) {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'assistant',
        content: `${roleDescription} ${JSON.stringify(snippet)}`
      }
    ]
  });

  const responseMsg = response.data.choices[0].message?.content;
  let result: validationResult;
  if (responseMsg) {
    try {
      result = JSON.parse(responseMsg);
    } catch (err) {
      result = parseOpenAIResponse(responseMsg);
    }

    if (result && !result.snippetId) {
      result.snippetId = snippet.id;
    }
  } else {
    result = {
      snippetId: snippet.id,
      reported: null,
      reason: 'No response from OpenAI'
    };
  }

  return result;
}
