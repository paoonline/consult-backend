export const createFactory = <T, E extends new (...args: any[]) => any>(
    data: T,
    Entity: E
  ): InstanceType<E> => {
    return new Entity(data);
};