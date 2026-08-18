
export function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

export function gridColumns(n) {
  for (let c = Math.floor(Math.sqrt(n)); c >= 2; c--) {
    if (n % c === 0) return Math.max(c, n / c);
  }
  return Math.ceil(Math.sqrt(n));
}

export function gridRows(n) {
  const cols = gridColumns(n);
  return Math.ceil(n / cols);
}
