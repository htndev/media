import { UnprocessableEntityException } from '@nestjs/common';

import { Errors } from '../../common/constants/error.constant';
import { convertBytesToMb } from '../../common/utils/convert.util';
import { getFileType } from '../../common/utils/mime-type.util';
import { File, FilesStrategy } from '../../common/utils/types.util';
import { BaseValidator } from '../../common/validators/base.validator';

export class FileSizeValidator implements BaseValidator<File[]> {
  constructor(private readonly strategies: FilesStrategy) {}

  validate(files: File[]): void {
    files.forEach(file => {
      const type = getFileType(file);
      if (!type) {
        throw new UnprocessableEntityException(Errors.InappropriateFileMimetype);
      }

      const maxSize = this.strategies[type].size;

      if (file.size > maxSize) {
        throw new UnprocessableEntityException(
          `${file.originalname} is too large (${convertBytesToMb(
            file.size
          )}). Max file size for ${type} is ${convertBytesToMb(maxSize)}`
        );
      }
    });
  }
}
