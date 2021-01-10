import { TypeOrError } from '../utils/types.util';

export interface BaseValidator<T> {
  validate(data: T): TypeOrError<void>;
}
