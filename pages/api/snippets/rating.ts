import type { NextApiRequest, NextApiResponse } from 'next';

import { createClient, PostgrestError } from '@supabase/supabase-js';
import { getUserIdByJwt } from '@/services/snippetsApi';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY ?? '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

type FetchRatingFunc = (
  action: 'increment_rating' | 'decrement_rating' | 'revoke_rating',
  rating_key: string,
  user_key: string
) => Promise<{ message: string; rating: string }>;

const fetchRating: FetchRatingFunc = async (action, rating_key, user_key) => {
  const { data, error } = await supabase.rpc(action, {
    rating_key,
    user_key
  });
  if (error) throw error;

  return { message: 'success', rating: data };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { ratingId, action, jwt } = req.body;

    if (!ratingId || !action || !jwt) {
      return res.status(400).json({
        message: '`ratingId`, `action` and `jwt` are required fields'
      });
    }

    const userId = await getUserIdByJwt(jwt);

    if (!userId) {
      return res.status(401).json({ message: 'User was not found' });
    }

    try {
      switch (action) {
        case 'increment':
          const incResult = await fetchRating(
            'increment_rating',
            ratingId,
            userId
          );

          return res.json(incResult);

        case 'decrement':
          const decResult = await fetchRating(
            'decrement_rating',
            ratingId,
            userId
          );

          return res.json(decResult);

        case 'revoke':
          const revokeResult = await fetchRating(
            'revoke_rating',
            ratingId,
            userId
          );

          return res.json(revokeResult);

        default:
          return res.status(400).json({
            message: 'Invalid action value'
          });
      }
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: 'Internal error while changing snippet rating' });
    }
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
