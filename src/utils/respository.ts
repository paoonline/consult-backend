export interface IRepository<T, P, U= unknown, O=unknown, C=void, A=0> {
    create(props: P): Promise<C>;
    findAll?(): Promise<T[]>;
    findUnique?(id: string): Promise<T | null>
    findFirst?(id: string): Promise<T | null>
    findOne(id: string): Promise<T | null>,
    findList?(list: string[]): Promise<T>
    findMany?(): Promise<T[]>,
    update?(id: string, data: U, other?: O): Promise<T | null>
    updateMany?(): Promise<number>,
    delete?(id: string): Promise<T>
    logout?(key: string):Promise<void>
    login?(email: string, password: string): Promise<string>
    aggregate?(id: string): Promise<A>
}
