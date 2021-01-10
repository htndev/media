import { BadRequestException } from '@nestjs/common';

import { File } from '../../common/utils/types.util';
import { BaseValidator } from '../../common/validators/base.validator';

export class IncludeFilesValidator implements BaseValidator<File[]> {
  validate(files: File[] = []): void {
    if (!files.length) {
      throw new BadRequestException('Files should be provided');
    }
  }
}
