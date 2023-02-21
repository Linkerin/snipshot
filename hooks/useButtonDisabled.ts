import { useMemo } from 'react';

/**
 * Hook that checks whether there are empty values for the provided object.
 * Used for providing boolean value to buttons' `disabled` property.
 * @param userInput An object that values should not be empty
 * @param excludedKeys Array of object keys that should not be considered
 * @param hasErrors If there are errors, the return value will be `true`
 * @returns `true` if there is an empty value, otherwise `false`
 * @example
 * const disabledBtn = useButtonDisabled({ name: 'John', surname: '' }, ['surname']) // false
 */
export default function useButtonDisabled(
  inputObj: {},
  excludedKeys?: string[],
  hasErrors?: boolean
) {
  function checkValues(input: {}, keys?: string[], error?: boolean) {
    if (error) return true;

    for (let [key, value] of Object.entries(input)) {
      if ((value === '' || !value) && !keys?.includes(key)) return true;
    }
    return false;
  }

  return useMemo(
    () => checkValues(inputObj, excludedKeys, hasErrors),
    [inputObj, excludedKeys, hasErrors]
  );
}
