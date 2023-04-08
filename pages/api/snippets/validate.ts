import type { NextApiRequest, NextApiResponse } from 'next';
import { log } from 'next-axiom';

import openAIValidateSnippet from '@/services/openai/openAIValidateSnippet';
import recordValidationResult from '@/services/prisma/snippetsService/recordValidationResult';

// const roleDescription = `
// Act as a content moderator. You are working for the website https://snipshot.dev:
// a platform where people can post their code snippets in different programming languages.
// Reply only with a JSON in the following structure: {
//   reported: boolean, // \`true\` if you as a moderator consider the code snippet inappropriate, otherwise - \`false\`
//   reason: string, // a short descriptions (no more than 256 symbols) explaining why you decided that the snippet was inappropriate
//   snippetId: string // snippetId from the input data.
// }.
// Do not add any other text as your response will be automatically parsed by \`JSON.parse()\`
// You should validate the posts and report whether the posted code snippet was wrong,
// harmful, offensive, malicious, defective or  in any other way inappropriate.
// You should also consider as inapproprite snippets which titles do not match with the provided code.
// In addition, mark as inappropriate code snippets that can ruin user's data, file system, erase database
// or do anything similar.
// Here is the code snippet that you should check:
// `;

// const snippet = `{
//   snippetId: 18rtcd-9857-0174nthsp,
//   title: 'Swap values in Python',
//   snippet: \`a = 10
//              b = 5
//              a, b = b, a
//              print(a, b) # 5 10\`
// }`;

// const snippet2 = `{
//   snippetId: 18rtcd-9857-0174n223thsp,
//   title: 'Log errors',
//   snippet: 'console.log("go f@ck yourself")'
// }`;

// const snippet3 = `{
//   snippetId: 18rtcd-9857-0174n123thsp,
//   title: 'Swap values in Python',
//   snippet: 'ifconfig | grep 'inet 192.168.*'
// }`;

// const snippet4 = `{
//   snippetId: 981889-scdysd9=-382938hssojy,
//   title: 'Copy text to clipboard',
//   snippet: 'async function copyToClipboard(text){
//   await navigator.clipboard.writeText(text);
// }'
// }`;

// /**
//  * Parses response message from ChatGPT to find inside its' response an object
//  * with `reported` and `reason` keys and extract their values.
//  * @param text Message from ChatGPT
//  * @example
//  * const result = parseResponse(messageContent);
//  */
// function parseOpenAIResponse(text: string) {
//   let reason: string | undefined = '';
//   const reasonMatch = text.match(/"reason": (.+)\,/);
//   console.log(reasonMatch);
//   if (reasonMatch && reasonMatch[1]) {
//     reason = reasonMatch[1].split('"').at(1);
//   }

//   let reported: boolean | null = null;
//   const reportedMatch = text.match(/"reported": (.+)\,/);
//   if (reportedMatch && reportedMatch[1]) {
//     reported = reportedMatch[1] === 'true';
//   }

//   return { reported, reason };
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { id, title, snippet, lang } = req.body;

    if (!title || !snippet || !lang || !id) {
      return res.status(400).json({
        message: 'Title, snippet, language and id are required fields.'
      });
    }

    res.status(200).send('OK');

    try {
      const validationResult = await openAIValidateSnippet({
        id,
        title,
        snippet,
        lang
      });
      const recorded = await recordValidationResult(validationResult);

      if (!recorded) {
        log.warn('Validation result was not recorded to DB', {
          snippetId: id,
          validationResult
        });
      }

      return;
    } catch (err) {
      log.error('Error while validating snippet at OpenAI', {
        err,
        snippetId: id
      });
      return;
    }
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
