import { Controller, Get, Param, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { AUDIO_FORMATS, IMAGE_FORMATS } from '../common/constants/file-formats.constants';
import { JwtGuard } from '../common/guards/jwt.guard';
import { CloudConfig } from '../common/providers/config/cloud.config';
import { ValidationService } from '../common/providers/validation/validation.service';
import { isAudio, isImage } from '../common/utils/mime-type.util';
import { ApiResponse, File, FilesStrategy, UploadFile } from '../common/utils/types.util';
import { MaxFilesAmountValidator } from '../common/validators/max-files-amount.validator';
import { MimetypeValidator } from '../common/validators/mime-type.validator';
import { FilesService } from './files.service';
import { FileSizeValidator } from './validators/file-size.validator';
import { IncludeFilesValidator } from './validators/include-files.validator';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly cloudConfig: CloudConfig,
    private readonly validationService: ValidationService
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async upload(@UploadedFiles() files: File[] = []): Promise<ApiResponse> {
    this.validationService.validate(
      IncludeFilesValidator,
      new MaxFilesAmountValidator(this.cloudConfig.maxFilesAmountForUpload),
      new MimetypeValidator([...IMAGE_FORMATS, ...AUDIO_FORMATS], [isImage, isAudio]),
      new FileSizeValidator(this.fileStrategy)
    )(files);

    return this.filesService.upload(files);
  }

  @Get(':uuid')
  async getMediaFile(@Param('uuid') uuid = '', @Res() response: Response): Promise<any> {
    return this.filesService.getMediaFile(uuid, response);
  }

  private get fileStrategy(): FilesStrategy {
    return {
      [UploadFile.Image]: {
        size: this.cloudConfig.maxImageSize
      },
      [UploadFile.Audio]: {
        size: this.cloudConfig.maxAudioSize
      }
    };
  }
}
