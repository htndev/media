import { NotAcceptableException } from '@nestjs/common';

import { File, MimetypeValidatorFunction } from '../utils/types.util';
import { BaseValidator } from './base.validator';

export class MimetypeValidator implements BaseValidator<File[]> {
  private isValid: MimetypeValidatorFunction = (mimetype: string) => false;

  constructor(
    readonly formats: string[],
    readonly isCorrectMimetype: MimetypeValidatorFunction | MimetypeValidatorFunction[]
  ) {
    this.isValid = Array.isArray(isCorrectMimetype) ? this.multipleValidators(isCorrectMimetype) : isCorrectMimetype;
  }

  validate(files: File[]): void {
    files.forEach(({ mimetype, originalname: title }) => {
      if (!this.isValid(mimetype)) {
        throw new NotAcceptableException(
          `${title} has inappropriate format. Allowed formats are ${this.formats.join(', ')}`
        );
      }
    });
  }

  private multipleValidators = (validators: MimetypeValidatorFunction[]): MimetypeValidatorFunction => (
    mimetype: string
  ) => validators.some((validator: MimetypeValidatorFunction) => validator(mimetype));
}
