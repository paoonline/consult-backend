export function chunkArray<T>(arr: T[], size: number): T[][] {
  // arr = 600, size 500

  // arr [500],[100]
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
