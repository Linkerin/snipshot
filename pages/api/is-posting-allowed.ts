import type { NextApiRequest, NextApiResponse } from 'next';

import { isPostingAllowed } from '@/services/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { userId } = req.query;
    if (userId instanceof Array) {
      return res.status(400).json({
        message: 'Inappropriate URL parameters. Only single `userId` is allowed'
      });
    }

    const postingPermission = await isPostingAllowed({ req, userId });

    return res.status(200).json(postingPermission);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
