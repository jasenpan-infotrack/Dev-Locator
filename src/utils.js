export function getQueryString (name, specialty) {
  if (name) return `?name=${name.toLowerCase()}`;
  if (specialty) return `?specialty=${specialty.toLowerCase()}`;
  return '';
}