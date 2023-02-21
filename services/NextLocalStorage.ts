/**
 * An object representing `localStorage` standard methods
 * with a client-side check necessary for Next.js
 */
class NextLocalStorage {
  /**
   * Behaviour is similar to `localStorage.setItem()`.
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   *
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set.
   * (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  setItem(key: string, value: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
      return true;
    }

    return false;
  }

  /**
   * Behaviour is similar to `localStorage.getItem()`.
   * Returns the current value associated with the given key, or null if the given key does not exist.
   */
  getItem(key: string) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  /**
   * Behaviour is similar to `localStorage.removeItem()`.
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  removeItem(key: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
      return true;
    }

    return false;
  }
}

export default new NextLocalStorage();
