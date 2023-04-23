import { useEffect, useMemo, useRef } from 'react';

/**
 * Hook that postpones the callback execution for a specified time and resets the counter after each change of the trigger value.
 * Trottling implementation.
 * @param callback Function that should be called after the delay
 * @param triggerValue Value that changing will be monitored to reset trottling timeout
 * @param executionDelay States how many ms should be waited before callback execution. Number, ms
 * @example
 * useTrottling(fetchDB, inputValue, 400); // `fetchDB` function will be executed after 400ms of `inputValue` last change
 */
function useTrottling(
  callback: () => {},
  triggerValue: any,
  executionDelay?: number
) {
  const firstRender = useRef(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const delay = useMemo(() => executionDelay ?? 600, [executionDelay]);
  //   TODO: think about proper implementation of dependency array
  const dependency = useMemo(
    () => JSON.stringify(triggerValue),
    [triggerValue]
  );

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const callFunction = async () => {
      if (timerRef?.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callback();
      }, delay);
    };

    callFunction();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [callback, delay, dependency]);

  return;
}

export default useTrottling;
