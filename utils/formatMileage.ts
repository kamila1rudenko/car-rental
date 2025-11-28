export function formatMileage(value: number): string {
  return value.toLocaleString("en-US").replace(/,/g, " ");
}
