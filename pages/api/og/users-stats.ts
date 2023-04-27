import type { NextApiRequest, NextApiResponse } from 'next';
import { log } from 'next-axiom';

import supabase from '@/services/supabase/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { name } = req.query;
      if (!name || Array.isArray(name)) {
        return res.status(400).json({
          message: 'name is a required field and should be unique'
        });
      }

      const { data: idData, error: idError } = await supabase
        .from('profiles')
        .select('id')
        .eq('name', name)
        .single();
      if (idError) throw idError;

      const userId = idData?.id;
      if (!userId) {
        return res.status(404).json({
          message: `'${name}' user's ID was not found`
        });
      }

      const { data, error, count } = await supabase
        .from('snippets')
        .select(
          `
            id,
            snippets_ratings (
              rating
            )
          `,
          { count: 'exact', head: false }
        )
        .eq('user_id', userId);
      if (error) throw error;

      const numOfSnippets = count && count >= 0 ? count : 0;
      const rating = data.reduce((sum, value) => {
        if (!value || !Array.isArray(value.snippets_ratings)) return sum;

        return sum + parseInt(value.snippets_ratings[0].rating);
      }, 0);
      let numOfFavorites = 0;

      return res.status(200).json({ numOfSnippets, numOfFavorites, rating });
    } catch (err) {
      log.error('Error while getting user stats for OG', { err });
      return res
        .status(500)
        .json({ message: 'Internal error while updating a snippet' });
    }
  }

  return res.status(405).send('Method Not Allowed');
}
