import { SyntheticEvent, useCallback, useState } from 'react';

type HandleMouseEventFunc = (e: SyntheticEvent | Event) => void;

/**
 * A hook that provides a boolean value indicating whether the element is hovered
 * or not and necessary handlers for `mouseenter` and `mouseleave` events.
 * @returns An array with 3 value: the first one is `boolean` for hovered or not,
 * the second one is `mouseenter` event handler and tha last one is `mouseleave`
 * event handler.
 */
function useHovered(): [boolean, HandleMouseEventFunc, HandleMouseEventFunc] {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter: HandleMouseEventFunc = useCallback(e => {
    setHovered(true);
  }, []);
  const handleMouseLeave: HandleMouseEventFunc = useCallback(e => {
    setHovered(false);
  }, []);

  return [hovered, handleMouseEnter, handleMouseLeave];
}

export default useHovered;
