export interface ResponseStatus<T> {
  status: number;
  message: string;
  data: T;
}
