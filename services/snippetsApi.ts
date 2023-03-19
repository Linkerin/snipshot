import createSnippetTree from './snippets';
// import { LANGS } from './constants';
import { LangsType, SnippetType } from './types';
import { getPaginationLimits, randomString, slugify } from './utils';
import supabase from './supabase';

// const snippetQuery = `
//       id,
//       title,
//       snippet,
//       lang,
//       slug,
//       tree,
//       verified,
//       tags,
//       created,
//       snippets_ratings (
//         id,
//         rating
//       ),
//       profiles (
//         name
//       )
//     `;

/**
 * Get user id value from supabase by JSON Web Token
 * @param jwt
 * @returns user id as a `string` or `null` if user was not found
 */
export async function getUserIdByJwt(jwt: string) {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser(jwt);
  if (userError) throw userError;

  const userId = user?.id ?? null;

  return userId;
}

type CreateFuncArgs = Pick<
  SnippetType,
  'title' | 'snippet' | 'lang' | 'tags'
> & { jwt: string };

/**
 * Records a new snippet into Supabase
 * @returns An object with created snippet or an object with error message
 */
export async function create({
  title,
  snippet,
  lang,
  tags,
  jwt
}: CreateFuncArgs) {
  // Check that there is no same snippet
  const { data: sameSnippets, error: sameSnippetsError } = await supabase
    .from('snippets')
    .select('title, snippet, lang, slug')
    .eq('title', title)
    .eq('snippet', snippet)
    .eq('lang', lang)
    .limit(1);
  if (sameSnippetsError) throw sameSnippetsError;
  if (sameSnippets && sameSnippets.length > 0) {
    return {
      status: 'error',
      message: 'The same snippet already exists',
      slug: sameSnippets[0].slug as string
    };
  }

  const tree = createSnippetTree(snippet, lang);
  let slug = slugify(title);

  // Check that there are no snippets with the same title
  const { data: snippets, error } = await supabase
    .from('snippets')
    .select('title')
    .eq('slug', slug)
    .limit(1);
  if (error) throw error;

  if (snippets && snippets?.length > 0) {
    slug += `-${randomString()}`;
  }

  const userId = await getUserIdByJwt(jwt);

  const { data: createdSnippet, error: insertError } = await supabase
    .from('snippets')
    .insert({
      title,
      snippet,
      lang,
      tree,
      slug,
      tags,
      user_id: userId
    })
    .select();
  if (insertError) throw insertError;

  if (createdSnippet?.length === 0) {
    return {
      status: 'error',
      message: 'Snippet was not recorded'
    };
  }

  return {
    status: 'success',
    message: `Snippet created`,
    snippet: createdSnippet && createdSnippet[0]
  };
}

type GetFuncArgs = {
  page?: string | string[];
  tag?: string | string[] | undefined[];
  lang?: string | string[];
};

/**
 * Get all snippets with pagination
 * and optional filtering by `lang` and `tags`
 * @returns An empty array or array of snippets
 */
// export async function get({ page, tag = [], lang }: GetFuncArgs = {}): Promise<
//   SnippetType[]
// > {
//   if (page instanceof Array && page.length > 1) {
//     return [];
//   }

//   // Check that provided `lang` string is a valid programming language
//   if (lang && !(lang instanceof Array)) {
//     if (!LANGS.includes(lang as LangsType)) return [];
//     lang = [lang];
//   }

//   // Check that every element of provided `lang` array
//   // is a valid programming language
//   if (lang && lang.length > 0 && lang instanceof Array) {
//     for (let elem of lang) {
//       if (!LANGS.includes(elem as LangsType)) return [];
//     }
//   }

//   if (tag && !(tag instanceof Array)) tag = [tag];

//   const { startIndex, lastIndex } = getPaginationLimits(page);

//   let dbQuery;
//   if (lang && lang instanceof Array) {
//     dbQuery = supabase
//       .from<SnippetType>('snippets')
//       .select(snippetQuery)
//       .contains('tags', tag)
//       .in('lang', lang)
//       .order('created', { ascending: false })
//       .range(startIndex, lastIndex);
//   } else {
//     dbQuery = supabase
//       .from<SnippetType>('snippets')
//       .select(snippetQuery)
//       .contains('tags', tag)
//       .order('created', { ascending: false })
//       .range(startIndex, lastIndex);
//   }

//   let { data: snippets, error } = await dbQuery;

//   if (error) throw error;
//   if (!snippets) return [];

//   return snippets;
// }

/**
 * Fetch snippet data by it's slug value
 * @param slug A snippet slug string
 * @returns An array with a single snippet
 */
// export async function getBySlug(slug: string) {
//   const { data: snippet, error } = await supabase
//     .from<SnippetType>('snippets')
//     .select(snippetQuery)
//     .eq('slug', slug)
//     .limit(1);

//   if (error) throw error;

//   return snippet;
// }

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
// export async function getUsersSnippets({
//   username,
//   minimalInfo,
//   page
// }: GetUsersSnippetsArgs) {
//   if (page instanceof Array && page.length > 1) {
//     return [];
//   }

//   const { data: user, error: userError } = await supabase
//     .from('profiles')
//     .select('id')
//     .eq('name', username)
//     .limit(1)
//     .single();
//   if (userError) throw userError;

//   const query = minimalInfo ? 'title, slug, lang' : snippetQuery;
//   const { startIndex, lastIndex } = getPaginationLimits(page);

//   const { data: snippets, error } = await supabase
//     .from('snippets')
//     .select(query)
//     .eq('user_id', user.id)
//     .range(startIndex, lastIndex);
//   if (error) throw error;

//   return snippets;
// }

// export async function search(query: string | string[]) {
//   if (!query) return [];

//   const { data: snippets, error } = await supabase
//     .from('snippets')
//     .select('title, slug, lang')
//     .order('created', { ascending: false })
//     .or(`title.ilike.%${query}%,snippet.ilike.%${query}%`);
//   if (error) throw error;

//   return snippets;
// }
