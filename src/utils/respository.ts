export interface IRepository<T, P> {
    create(props: P): Promise<void>;
    findAll(): Promise<T[]>;
    findUnique?(id: string): Promise<T | null>
    findOne(id: string): Promise<T | null>,
    delete(id: string): Promise<T>
    logout?(key: string):Promise<void>
    login?(email: string, password: string): Promise<string>
}
