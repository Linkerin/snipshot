import prisma from '../prisma';

interface GetUsersSnippetsArgs {
  username: string;
  minimalInfo?: boolean;
  page?: string | string[];
}

/**
 * Get all user's snippets with pagination
 * @param minimalInfo If `true`, array contains only `title`, `slug` and `lang` fields
 * @returns An array of snippets or an empty array
 */
async function getByUser({
  username,
  minimalInfo,
  page = '1'
}: GetUsersSnippetsArgs) {
  if (page instanceof Array && page.length > 1) {
    return [];
  }

  let itemsPerPage = 10;
  // Check that PAGINATION environment variable parses to a valid number
  if (
    process.env.NEXT_PUBLIC_PAGINATION &&
    !isNaN(+process.env.NEXT_PUBLIC_PAGINATION)
  ) {
    itemsPerPage = +process.env.NEXT_PUBLIC_PAGINATION;
  }
  let currentPage = 0;
  if (!isNaN(+page)) currentPage = +page - 1;

  const snippets = await prisma.snippet.findMany({
    skip: currentPage * itemsPerPage,
    take: itemsPerPage,
    select: minimalInfo
      ? {
          title: true,
          lang: true,
          slug: true
        }
      : {
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
            select: { name: true }
          },
          rating: {
            select: {
              id: true,
              rating: true
            }
          }
        },
    where: {
      author: {
        name: {
          equals: username
        }
      }
    }
  });

  return snippets;
}

export default getByUser;
