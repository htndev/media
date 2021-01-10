import { BadRequestException } from '@nestjs/common';

import { File } from '../utils/types.util';
import { BaseValidator } from '../validators/base.validator';

export class MaxFilesAmountValidator implements BaseValidator<File[]> {
  constructor(private readonly max: number) {}

  validate(files: File[]) {
    if (files.length > this.max) {
      throw new BadRequestException(`Too many files. Max amount of files is ${this.max}`);
    }
  }
}
