/**
 * Fetch `/api/is-posting-allowed` route
 * @param userId userId (optional)
 * @returns An object with two keys: `allowed` and `message`
 * @example
 * const postingPermission = await fetchIsPostingAllowed(userId);
 */
export default async function fetchIsPostingAllowed(userId?: string) {
  let url = '/api/is-posting-allowed';
  if (userId) {
    url += `?userId=${userId}`;
  }

  const res = await fetch(url);
  if (!res.ok && res.status !== 429) {
    const error = await res.json();
    throw error;
  }

  const postingPermission = await res.json();

  return postingPermission as { allowed: boolean; message: string };
}
