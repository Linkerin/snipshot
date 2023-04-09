import type { NextApiRequest, NextApiResponse } from 'next';
import { log } from 'next-axiom';

import openAIValidateSnippet from '@/services/openai/openAIValidateSnippet';
import recordValidationResult from '@/services/prisma/snippetsService/recordValidationResult';

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

        return res.status(404);
      }

      return res.status(200).send('OK');
    } catch (err) {
      log.error('Error while validating snippet at OpenAI', {
        err,
        snippetId: id
      });

      return res.status(500);
    }
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
