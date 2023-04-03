import { Prisma } from '@prisma/client';

import { LANGS } from '@/services/constants';
import { LangsType } from '@/services/types';
import prisma from '../prisma';

type GetFuncArgs = {
  page?: string | string[];
  tag?: string | string[];
  lang?: string | string[];
};

/**
 * Get all snippets with pagination
 * and optional filtering by `lang` and `tags`
 * @returns An empty array or array of snippets
 */
async function get({ page = '1', tag = [], lang }: GetFuncArgs = {}) {
  if (page instanceof Array && page.length > 1) {
    return [];
  }

  // Check that every element of provided `lang` array
  // is a valid programming language
  if (lang && lang instanceof Array && lang.length > 0) {
    for (let elem of lang) {
      if (!LANGS.includes(elem as LangsType)) return [];
    }
  }

  // Check that provided `lang` string is a valid programming language
  if (lang && !(lang instanceof Array)) {
    if (!LANGS.includes(lang as LangsType)) return [];
    lang = [lang];
  }

  if (tag && !(tag instanceof Array)) tag = [tag];

  let whereParams: Prisma.SnippetFindManyArgs['where'] = {};
  if (tag instanceof Array && tag.length > 0) {
    const tagsQuery = tag.map(tag => ({ tags: { has: tag } }));
    whereParams.OR = tagsQuery;
  }

  if (lang instanceof Array && lang.length > 0) {
    const langsQuery = {
      OR: lang.map(langElem => ({ lang: { equals: langElem } }))
    };
    whereParams.AND = langsQuery;
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
    where: whereParams,
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

export default get;
