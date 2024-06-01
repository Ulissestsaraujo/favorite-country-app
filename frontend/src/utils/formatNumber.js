export function formatNumberWithCommas(number) {
  return new Intl.NumberFormat("de-DE").format(number);
}
