/**
 * Returns a non-empty array of the length stated in `len` function's argument.
 * If non-numeric or empty argument provided, the function will return an empty array.
 * @param len Returned array length
 * @returns A non-empty array
 * @example
 * const fourElementsArray = nLengthArray(5) // [0, 1, 2, 3]
 */
function nLengthArray(len?: number) {
  if (typeof len !== 'number') len = 0;

  return Array.from(Array(len).keys());
}

export default nLengthArray;
