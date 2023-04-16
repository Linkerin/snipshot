/**
 * Cleans data type to avoid NextJS [serializing error](https://github.com/vercel/next.js/issues/11993)
 * @param data Any `object`
 * @returns copy of `data` object with proper types
 */
function cleanObjDataTypesForNextJS(data: any) {
  for (let [key, item] of Object.entries(data)) {
    if (item === null) continue;

    if (typeof item === 'bigint') {
      data[key] = Number(item);
      continue;
    }

    // Check for a Date object
    if (item instanceof Date && typeof item.getDate === 'function') {
      data[key] = JSON.parse(JSON.stringify(item));
      continue;
    }

    if (Array.isArray(item) || typeof item === 'object') {
      data[key] = cleanObjDataTypesForNextJS(item);
      continue;
    }
  }

  return data;
}

export default cleanObjDataTypesForNextJS;
