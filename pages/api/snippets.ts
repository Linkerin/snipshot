import type { NextApiRequest, NextApiResponse } from 'next';

import { LANGS } from '@/services/constants';
import {
  create as createSnippet,
  update as updateSnippet
} from '@/services/supabase/snippetsApi';
import cleanObjDataTypesForNextJS from '@/services/utils/cleanObjDataTypesForNextJS';
import get from '@/services/prisma/snippetsService/get';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { title, snippet, lang, tags, jwt } = req.body;

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

      const result = await createSnippet({
        title,
        snippet,
        lang,
        tags,
        jwt
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

  if (req.method === 'PATCH') {
    try {
      const { title, snippet, lang, tags, snippetId, jwt } = req.body;

      if (!title || !snippet || !lang || !snippetId || !jwt) {
        return res.status(400).json({
          message: 'ID, title, snippet, language and token are required fields.'
        });
      }

      if (!LANGS.includes(lang)) {
        return res.status(400).json({
          message: `${lang} language is not supported.`
        });
      }

      const result = await updateSnippet({
        title,
        snippet,
        lang,
        tags,
        snippetId,
        jwt
      });
      if (result.status === 'error') {
        return res.status(400).json(result);
      }

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: 'Internal error while updating a snippet' });
    }
  }

  if (req.method === 'GET') {
    let { page, tag, lang } = req.query;
    const snippetsData = await get({ page, tag, lang });
    const snippets = snippetsData.map(snippet =>
      cleanObjDataTypesForNextJS(snippet)
    );

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=59'
    );

    return res.json(snippets);
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
