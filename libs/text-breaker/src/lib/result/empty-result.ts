import { Result } from './valueResult';

export function emptyResult(): Result<null> {
  return {
    hasValue: false,
    value: null,
  };
}
