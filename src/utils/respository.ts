export interface IRepository<T, P> {
    create(props: P): Promise<void>;
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T | null>,
    logout(key: string): Promise<void>
}
