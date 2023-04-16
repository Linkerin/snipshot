/**
 * Checks whether the provided character belongs to ASCII characters or not
 * @param char Single `string` character
 * @returns `true` if the character belongs to ASCII, `false` otherwise
 */
function isAscii(char: string): boolean {
  if (!char || char.length !== 1) return false;

  const charCode = char.charCodeAt(0);
  if (20 <= charCode && charCode <= 127) return true;

  return false;
}

export default isAscii;
