import { Result } from './valueResult';

export function valueResult<T>(value: T): Result<T> {
  return {
    hasValue: true,
    value,
  };
}
