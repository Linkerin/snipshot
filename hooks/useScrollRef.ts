import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

interface UseScrollRefArgs {
  root?: Element | Document | null;
  threshold?: number | number[];
  rootMargin?: string;
}

/**
 * Hook that observes for element intersections
 * @param root
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root IntersectionObserver `root` property}
 * @param threshold
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#threshold IntersectionObserver `threshold` property}
 * @param  rootMargin
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#rootmargin IntersectionObserver `rootMargin` property}
 * @returns An array containing 3 elements: boolean value for intersection,
 * ref object and a callback function to update observer
 * when ref was moved to another object
 * @example
 * const [isIntersecting, targetRef, updateObserver] = useScrollRef();
 */
export default function useScrollRef({
  root,
  threshold,
  rootMargin
}: UseScrollRefArgs = {}): [boolean, MutableRefObject<null>, () => void] {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const targetRef = useRef(null);

  const handleObserver = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setIsIntersecting(true);
      return;
    }
    setIsIntersecting(false);
  }, []);

  const observer = useMemo(() => {
    const defaultObserverOptions = {
      root: null,
      threshold: 0.1
    };

    const options: IntersectionObserverInit = {
      ...defaultObserverOptions,
      root,
      threshold,
      rootMargin
    };

    // Check for client side for Next.js
    if (typeof window !== 'undefined') {
      return new IntersectionObserver(handleObserver, options);
    }
  }, [handleObserver, threshold, rootMargin, root]);

  // Sets new observer target when `ref` element was changed
  const updateObserver = useCallback(() => {
    observer?.disconnect();
    setIsIntersecting(false);
    if (targetRef?.current) observer?.observe(targetRef.current);
  }, [observer]);

  useEffect(() => {
    if (targetRef?.current) observer?.observe(targetRef.current);

    return () => {
      observer?.disconnect();
    };
  }, [observer]);

  return [isIntersecting, targetRef, updateObserver];
}
