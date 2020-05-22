export interface Result<T> {
  hasValue: boolean;
  value: T | null;
}
