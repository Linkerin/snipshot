import { Snippet } from '@prisma/client';

import prisma from '../prisma';

/**
 * Fetch snippet data by it's slug value
 * @param slug A snippet slug string
 * @returns An array with a single snippet
 */
async function getBySlug(slug: Snippet['slug']) {
  if (!slug) return [];

  const snippet = await prisma.snippet.findUnique({
    select: {
      id: true,
      title: true,
      snippet: true,
      lang: true,
      slug: true,
      tree: true,
      verified: true,
      tags: true,
      created: true,
      author: {
        select: { id: true, name: true }
      },
      rating: {
        select: {
          id: true,
          rating: true
        }
      }
    },
    where: { slug }
  });

  if (!snippet) return [];

  return [snippet];
}

export default getBySlug;
