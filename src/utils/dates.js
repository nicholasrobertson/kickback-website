export function formatReadableDate(value, locale = 'en-NZ') {
  if (!value) {
    return '';
  }
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(date);
  } catch {
    return value;
  }
}
