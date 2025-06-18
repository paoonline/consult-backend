export function createFactory<T>(
  data: any,
  EntityClass: new (...args: any[]) => T,
  ...args: any[]
): T {
  return new EntityClass(data, ...args);
}
