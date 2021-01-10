import { Errors } from './../common/constants/error.constant';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AUDIO_FORMATS, IMAGE_FORMATS } from '../common/constants/file-formats.constants';
import { JwtGuard } from '../common/guards/jwt.guard';
import { CloudConfig } from '../common/providers/config/cloud.config';
import { ValidationService } from '../common/providers/validation/validation.service';
import { isAudio, isImage } from '../common/utils/mime-type.util';
import { ApiResponse as CloudApiResponse, File, FilesStrategy, UploadFile } from '../common/utils/types.util';
import { MaxFilesAmountValidator } from '../common/validators/max-files-amount.validator';
import { MimetypeValidator } from '../common/validators/mime-type.validator';
import { FilesService } from './files.service';
import { FileSizeValidator } from './validators/file-size.validator';
import { IncludeFilesValidator } from './validators/include-files.validator';

@ApiTags('files')
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
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiBody({
    description: 'Body should include at least 1 file.',
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'No files provided or too many files.'
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: `${Errors.InappropriateFileMimetype} or file is too large.`
  })
  @ApiResponse({
    description: `Will return an array of file's url.`,
    status: HttpStatus.OK,
    schema: {
      example: ['http://localhost:4000/v1/files/226de153-3d13-479d-8bbe-08c36d715080']
    }
  })
  async upload(@UploadedFiles() files: File[] = []): Promise<CloudApiResponse> {
    this.validationService.validate(
      IncludeFilesValidator,
      new MaxFilesAmountValidator(this.cloudConfig.maxFilesAmountForUpload),
      new MimetypeValidator([...IMAGE_FORMATS, ...AUDIO_FORMATS], [isImage, isAudio]),
      new FileSizeValidator(this.fileStrategy)
    )(files);

    return this.filesService.upload(files);
  }

  @Get(':uuid')
  @ApiResponse({
    description: 'File found and returned',
    status: HttpStatus.OK
  })
  @ApiResponse({
    description: 'File not found',
    status: HttpStatus.NOT_FOUND
  })
  @ApiParam({
    type: 'string',
    name: 'uuid',
    description: 'Unique id of file',
    required: true
  })
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
