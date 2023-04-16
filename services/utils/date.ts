/**
 * Converts a timestamp into string date
 * of the *DD/MM/YYYY* format (*en-GB*)
 * @param timestamp
 * @returns date string in *DD/MM/YYYY* format or nothing
 */
export function parseDate(
  timestamp: string | Date,
  options: Intl.DateTimeFormatOptions = {}
): string | typeof undefined {
  let date;

  if (typeof timestamp === 'string') {
    date = new Date(timestamp);
  } else {
    date = timestamp;
  }

  if (isNaN(date.valueOf())) {
    return;
  }

  return Intl.DateTimeFormat('en-GB', options).format(date);
}
