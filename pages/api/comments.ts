import { NextApiRequest, NextApiResponse } from 'next';

import getComments from '@/services/prisma/commentsService/getComments';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { snippetId } = req.query;
  if (!snippetId) {
    return res.status(400).json({ message: '`snippetId is required`' });
  }
  if (snippetId instanceof Array) {
    return res.status(400).json({
      message:
        'Inappropriate URL parameters. Only single `snippetId` is allowed'
    });
  }

  try {
    const comments = await getComments(snippetId);

    res.setHeader('Cache-Control', 's-maxage=5000');

    return res.status(200).json({ snippetId, comments });
  } catch (err) {
    console.error(`Error while fetching comments of snippet id ${snippetId}`);
    console.error(err);

    return res.status(500).json({
      message: 'Internal error while fetching comments'
    });
  }
}
