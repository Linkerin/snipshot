/**
 * Creates a random string using Math.random() method and Date.now().
 * @returns Random string
 * @example randomString(); // 'a35cb487380'
 */
function randomString(): string {
  return (
    Math.random().toString(16).slice(2, 7) + Date.now().toString().slice(7)
  );
}

export default randomString;
