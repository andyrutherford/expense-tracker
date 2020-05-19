export function numberWithCommas(x) {
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    .split('.')
    .slice(0, 1);
}
