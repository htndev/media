import { Type } from '@nestjs/common';

import { isClass } from '../utils/shared.util';
import { TypeOrError } from '../utils/types.util';
import { BaseValidator } from '../validators/base.validator';

type BV<T> = BaseValidator<T>;
type StaticBV<T> = Type<BaseValidator<T>>;
export type ValidatorType<T> = BV<T> | StaticBV<T>;

export class Validation<T> {
  constructor(private readonly validators: ValidatorType<T>[] = []) {}

  validate(data: T): TypeOrError<void> {
    this.validators.forEach(validator =>
      isClass(validator) ? new (validator as StaticBV<T>)().validate(data) : (validator as BV<T>).validate(data)
    );
  }
}
