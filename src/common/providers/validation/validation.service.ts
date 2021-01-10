import { Injectable } from '@nestjs/common';

import { TypeOrError } from '../../utils/types.util';
import { Validation, ValidatorType } from '../../validation/base.validation';

@Injectable()
export class ValidationService {
  validate = <T>(...validators: ValidatorType<T>[]): ((validationObject: T) => TypeOrError<void>) => (
    validationObject: T
  ) => new Validation(validators).validate(validationObject);
}
