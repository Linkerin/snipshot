import { useCallback, useState } from 'react';

/**
 * Hook that is used with button groups to confirm user's action
 * @returns An abject with boolean `showConfirmation` state value
 * and a `toggleConfimation` handler to change the state
 * @example
 * const { showConfirmation, toggleConfirmation } = useActionConfirmation();

 */
function useActionConfirmation() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const toggleConfirmation = useCallback(() => {
    setShowConfirmation(prevState => !prevState);
  }, []);

  return { showConfirmation, toggleConfirmation };
}

export default useActionConfirmation;
