import supabase from './supabase';

/**
 * Get user id value from supabase by JSON Web Token
 * @param jwt
 * @returns user id as a `string` or `null` if user was not found
 */
export default async function getUserIdByJwt(jwt: string) {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser(jwt);
  if (userError) throw userError;

  const userId = user?.id ?? null;

  return userId;
}
