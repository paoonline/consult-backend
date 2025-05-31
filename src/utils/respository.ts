export interface IRepository<T, P, U= unknown, O=unknown, C=void, A=0> {
    create(props: P): Promise<C>;
    findAll(): Promise<T[]>;
    findUnique?(id: string): Promise<T | null>
    findFirst?(id: string): Promise<T | null>
    update?(id: string, data: U, other: O): Promise<T | null>
    findOne(id: string): Promise<T | null>,
    delete?(id: string): Promise<T>
    logout?(key: string):Promise<void>
    login?(email: string, password: string): Promise<string>
    findList?(list: string[]): Promise<T>;
    aggregate?(id: string): Promise<A>
}
