import { useCallback, useMemo, useState } from 'react';

interface UsePaginatedHandlerOptions {
  first?: boolean;
  params?: object;
}

/**
 * Hook that is used for fetching data from backend handlers with pagination
 * @param link Handler link with preceding `/`. Example: `/snippets`
 * @param first States whether fetching should start with the first page or not
 * @returns An array of 2 elements: fetched data array or an empty array
 * and a boolean `hasMore` attribute indicating whether there are more data
 * at the backend or not
 * @example
 * const [fetchData, hasMore] = usePaginatedHandler<SnippetType>('/snippets');
 */
export default function usePaginatedHandler<T>(
  link: string,
  { first = false, params }: UsePaginatedHandlerOptions = {}
): [(controller: AbortController) => Promise<T[]>, boolean] {
  const startPage = first ? 1 : 2;
  const [page, setPage] = useState(startPage);
  const [hasMore, setHasMore] = useState(true);

  let url = useMemo(
    () =>
      new URL(
        // Remove the following `/` if there is one
        '/api' + link.replace(/\/$/, ''),
        process.env.NEXT_PUBLIC_BASE_URL
      ),
    [link]
  );
  url.searchParams.set('page', `${page}`);

  // Add additional parameters to the url
  if (params) {
    for (let [key, value] of Object.entries(params)) {
      url.searchParams.set(`${key}`, `${value}`);
    }
  }

  const fetchData = useCallback(
    async (controller: AbortController) => {
      try {
        const res = await fetch(url, {
          signal: controller.signal
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message);
        }
        const data = await res.json();
        if (data?.length == 0) {
          setHasMore(false);
          return [] as T[];
        }
        setPage(prevState => prevState + 1);

        return [...data] as T[];
      } catch (err) {
        controller.abort();
        const log = (await import('next-axiom')).log;
        log.error('Pagination fetching error', { err, url });
        return [] as T[];
      }
    },
    [url]
  );

  return [fetchData, hasMore];
}
