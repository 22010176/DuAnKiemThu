export function getFormData(elem) {
  return Object.fromEntries(new FormData(elem));
}