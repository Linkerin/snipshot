import createSnippetTree from '../snippets';
import getUserIdByJwt from './getUserIdByJwt';
import { SnippetType } from '../types';
import { randomString, slugify } from '../utils';
import supabase from './supabase';

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
