import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';

import { folders } from '../../constants/folders.constant';
import { CloudApiResponse, File, UploadFile } from '../../utils/types.util';
import { CloudConfig } from '../config/cloud.config';

@Injectable()
export class UploaderService {
  private uploader: typeof cloudinary = cloudinary;

  constructor(cloudConfig: CloudConfig) {
    this.uploader.config({
      /* eslint-disable */
      cloud_name: cloudConfig.cloudName,
      api_key: cloudConfig.cloudApiKey,
      api_secret: cloudConfig.cloudApiSecret
      /* eslint-enable */
    });
  }

  async upload({ buffer }: File, type: UploadFile): Promise<string> {
    return new Promise((resolve, reject) => {
      this.uploader.uploader
        .upload_stream(
          // eslint-disable-next-line @typescript-eslint/camelcase
          { unique_filename: true, folder: this.getFolder(type), resource_type: 'auto' },
          (err: UploadApiErrorResponse, response: UploadApiResponse) => {
            if (err) {
              reject(err);
            }

            resolve(this.getUrlFromCloudResponseUrl(response));
          }
        )
        .end(buffer);
    });
  }

  private getFolder(type: UploadFile): string {
    return folders[type] ?? folders.other;
  }

  private getUrlFromCloudResponseUrl = ({ secure_url: url }: CloudApiResponse) => url;
}
