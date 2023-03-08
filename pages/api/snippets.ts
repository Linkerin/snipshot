import type { NextApiRequest, NextApiResponse } from 'next';

import { LANGS } from '@/services/constants';
import * as snippetService from '@/services/snippetsApi';
import get from '@/services/prisma/snippetsService/get';
import { cleanObjDataTypesForNextJS } from '@/services/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { title, snippet, lang, tags } = req.body;

      if (!title || !snippet || !lang) {
        return res.status(400).json({
          message: 'Title, snippet and language are required fields.'
        });
      }

      if (!LANGS.includes(lang)) {
        return res.status(400).json({
          message: `${lang} language is not supported.`
        });
      }

      const result = await snippetService.create({
        title,
        snippet,
        lang,
        tags,
        req
      });
      if (result.status === 'error') {
        return res.status(400).json(result);
      }

      return res.status(201).json(result);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: 'Internal error while saving a snippet' });
    }
  }

  if (req.method === 'GET') {
    let { page, tag, lang } = req.query;
    const snippetsData = await get({ page, tag, lang });
    const snippets = snippetsData.map(snippet =>
      cleanObjDataTypesForNextJS(snippet)
    );

    return res.json(snippets);
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
