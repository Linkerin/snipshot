import prisma from '../prisma';

/**
 * Looks for the passed value inside `title` and `snippet` fields of the Snippet model.
 * @param query string value to search for
 * @returns An empty array or array of snippets
 */
async function search(query: string | string[]) {
  if (!query || Array.isArray(query)) return [];

  const snippets = await prisma.snippet.findMany({
    take: 10,
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
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { snippet: { contains: query, mode: 'insensitive' } }
      ]
    },
    orderBy: [
      {
        rating: {
          rating: 'desc'
        }
      },
      {
        verified: 'desc'
      }
    ]
  });

  return snippets;
}

export default search;
