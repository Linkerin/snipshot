import type { NextApiRequest, NextApiResponse } from 'next';

import { cleanObjDataTypesForNextJS } from '@/services/utils';
import search from '@/services/prisma/snippetsService/search';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { q } = req.query;
  if (!q) return res.json([]);

  try {
    const result = await search(q);

    return res.json(cleanObjDataTypesForNextJS(result));
  } catch (err) {
    console.error(`API error while processing search query ${q}.`);
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Internal error during search processing' });
  }
}
