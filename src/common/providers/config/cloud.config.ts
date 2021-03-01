import { Injectable } from '@nestjs/common';
import { BaseConfig } from '@xbeat/server-toolkit';
import * as Joi from 'joi';

interface CloudConfigProps {
  CLOUD_NAME: string;
  CLOUD_API_KEY: number;
  CLOUD_API_SECRET: string;
  MAX_IMAGE_SIZE: number;
  MAX_AUDIO_SIZE: number;
  MAX_FILES_AMOUNT_FOR_UPLOAD: number;
}

@Injectable()
export class CloudConfig extends BaseConfig<CloudConfigProps> {
  getSchema(): Joi.ObjectSchema {
    return Joi.object().append({
      CLOUD_NAME: Joi.string().required(),
      CLOUD_API_KEY: Joi.number().required(),
      CLOUD_API_SECRET: Joi.string().required(),
      MAX_IMAGE_SIZE: Joi.number().required(),
      MAX_AUDIO_SIZE: Joi.number().required(),
      MAX_FILES_AMOUNT_FOR_UPLOAD: Joi.number().required()
    });
  }

  get cloudName(): string {
    return this.config.CLOUD_NAME;
  }

  get cloudApiKey(): number {
    return this.config.CLOUD_API_KEY;
  }

  get cloudApiSecret(): string {
    return this.config.CLOUD_API_SECRET;
  }

  get maxImageSize(): number {
    return this.config.MAX_IMAGE_SIZE;
  }

  get maxAudioSize(): number {
    return this.config.MAX_AUDIO_SIZE;
  }

  get maxFilesAmountForUpload(): number {
    return this.config.MAX_FILES_AMOUNT_FOR_UPLOAD;
  }
}
