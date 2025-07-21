export function truncateTime(input: Date): Date {
  const date = new Date(input);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}
