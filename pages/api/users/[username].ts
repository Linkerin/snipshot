import type { NextApiRequest, NextApiResponse } from 'next';

import cleanObjDataTypesForNextJS from '@/services/utils/cleanObjDataTypesForNextJS';
import getByUser from '@/services/prisma/snippetsService/getByUser';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { username, minimal, page } = req.query;

    if (!username) {
      return res
        .status(400)
        .json({ message: '`username` parameter is required' });
    }

    if (username instanceof Array || minimal instanceof Array) {
      return res.status(400).json({
        message:
          'Inappropriate URL parameters. Only single `username` and `minimal` are allowed'
      });
    }

    let minimalInfo = minimal === 'true';

    try {
      const snippetsData = await getByUser({
        username,
        minimalInfo,
        page
      });
      const snippets = snippetsData.map(snippet =>
        cleanObjDataTypesForNextJS(snippet)
      );

      return res.json(snippets);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Internal error while fetching user's snippets" });
    }
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
