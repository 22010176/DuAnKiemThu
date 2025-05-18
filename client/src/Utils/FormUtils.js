export function getFormData(elem) {
  return Object.fromEntries(new FormData(elem));
}

export function getNextIdNumber(data = []) {
  return Math.max(...data.map(i => +i.split('-')[1])) + 1
}