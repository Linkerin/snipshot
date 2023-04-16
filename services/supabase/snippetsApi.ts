import { createClient } from '@supabase/supabase-js';

import createSnippetTree from '@/services/snippets';
import getUserIdByJwt from './getUserIdByJwt';
import randomString from '@/services/utils/randomstring';
import { SnippetType } from '@/services/types';
import slugify from '@/services/utils/slugify';
import supabase from './supabase';

/**
 * Checks whether the same snippet already exists in the database
 * @returns An object. Required is a boolean property `exists`. `slug` and `id` properties
 *  are optional and return only if `exists` is `true`.
 * @example
 * const sameSnippet = await checkForSameSnippet({ title, snippet, lang }); // { exists: false }
 */
async function checkForSameSnippet({
  title,
  snippet,
  lang
}: Pick<SnippetType, 'title' | 'snippet' | 'lang'>) {
  const { data: sameSnippets, error: sameSnippetsError } = await supabase
    .from('snippets')
    .select('id, slug')
    .eq('title', title)
    .eq('snippet', snippet)
    .eq('lang', lang)
    .limit(1);
  if (sameSnippetsError) throw sameSnippetsError;
  if (sameSnippets && sameSnippets.length > 0) {
    return {
      exists: true,
      slug: sameSnippets[0].slug as string,
      id: sameSnippets[0].id as string
    };
  }

  return { exists: false };
}

/**
 * Checks whether the snippet with the same slug is already in the database
 * @param slug Generated slug as a string
 * @returns `true` if there is the same slug in the DB, otherwise `false`
 * @example
 * const sameSlugExists = await checkForSameSlug(slug); // true
 */
async function checkForSameSlug(slug: string, id?: string) {
  let snippets: { id: string }[] = [];
  const { data: snippetsData, error } = await supabase
    .from('snippets')
    .select('id')
    .eq('slug', slug);
  if (error) throw error;

  if (id && snippetsData.length > 0) {
    snippetsData.forEach(snippet => {
      if (snippet.id !== id) snippets.push(snippet);
    });
  } else {
    snippets = snippetsData;
  }

  if (snippets && snippets?.length > 0) {
    return true;
  }

  return false;
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
  const sameSnippet = await checkForSameSnippet({ title, snippet, lang });
  if (sameSnippet.exists) {
    return {
      status: 'error',
      message: 'The same snippet already exists',
      slug: sameSnippet.slug
    };
  }

  const tree = createSnippetTree(snippet, lang);
  let slug = slugify(title);

  // Check that there are no snippets with the same slug
  const sameSlugExists = await checkForSameSlug(slug);
  if (sameSlugExists) {
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

interface UpdateFuncArgs extends CreateFuncArgs {
  snippetId: string;
}

/**
 * Updates snippet's data in Supabase
 * @returns An object with created snippet or an object with error message
 */
export async function update({
  title,
  snippet,
  lang,
  tags,
  snippetId,
  jwt
}: UpdateFuncArgs) {
  // Check that the updated snippet does not duplicate existing one
  const sameSnippet = await checkForSameSnippet({ title, snippet, lang });
  if (sameSnippet.exists) {
    return {
      status: 'error',
      message: 'The same snippet already exists',
      slug: sameSnippet.slug
    };
  }

  const getUserId = getUserIdByJwt(jwt);
  const { data, error } = await supabase
    .from('snippets')
    .select('id, user_id')
    .eq('id', snippetId)
    .limit(1);
  if (error) throw error;

  const snippetData = data[0];
  if (!snippetData) {
    return {
      status: 'error',
      message: 'Snippet was not found'
    };
  }

  const userId = await getUserId;
  if (userId !== snippetData['user_id']) {
    return {
      status: 'error',
      message: 'Not allowed'
    };
  }

  const tree = createSnippetTree(snippet, lang);
  let slug = slugify(title);

  // Check that there are no snippets with the same slug
  const sameSlugExists = await checkForSameSlug(slug, snippetId);
  if (sameSlugExists) {
    slug += `-${randomString()}`;
  }

  const supabaseUpdateClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    { global: { headers: { Authorization: `Bearer ${jwt}` } } }
  );
  const { data: updatedSnippet, error: updateError } =
    await supabaseUpdateClient
      .from('snippets')
      .update({
        title,
        snippet,
        lang,
        tree,
        slug,
        tags,
        updated: new Date()
      })
      .eq('id', snippetId)
      .eq('user_id', snippetData['user_id'])
      .select();
  if (updateError) throw updateError;

  if (updatedSnippet?.length === 0) {
    return {
      status: 'error',
      message: 'Snippet was not updated'
    };
  }

  return {
    status: 'success',
    message: `Snippet updated`,
    snippet: updatedSnippet && updatedSnippet[0]
  };
}
