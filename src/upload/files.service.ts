import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AppConfig } from '@xbeat/server-toolkit';
import { Response } from 'express';

import { Errors } from '../common/constants/error.constant';
import { UploaderService } from '../common/providers/uploader/uploader.service';
import { UuidService } from '../common/providers/uuid/uuid.service';
import { mapAsync } from '../common/utils/async-iterators.util';
import { fetchFile } from '../common/utils/fetch-file.util';
import { getFileType } from '../common/utils/mime-type.util';
import { sendFile } from '../common/utils/send-file.util';
import { ApiResponse, File, UploadFile } from '../common/utils/types.util';
import { MediaFileRepository } from '../repositories/media-file.repository';

type FileToUpload = { type: UploadFile; file: File };

@Injectable()
export class FilesService {
  constructor(
    private readonly uploaderService: UploaderService,
    private readonly uuidService: UuidService,
    private readonly appConfig: AppConfig,
    private readonly mediaFileRepository: MediaFileRepository
  ) {}

  async upload(files: File[]): Promise<ApiResponse> {
    if (!files.length) {
      return this.formatResponse([]);
    }

    const filesToUpload = this.prepareFiles(files);

    const _files: any[] = await mapAsync(filesToUpload, async ({ file, type }: FileToUpload) => {
      const uploadedUrl = await this.uploaderService.upload(file, type);
      const newMediaFile = this.mediaFileRepository.create({
        uuid: await this.uuidService.generateUuid(),
        url: uploadedUrl,
        size: file.size,
        type,
        mimetype: file.mimetype
      });

      await newMediaFile.save();

      return `${this.appConfig.url}/${this.appConfig.apiVersion}/files/${newMediaFile.uuid}`;
    });

    return this.formatResponse(_files);
  }

  async getMediaFile(uuid: string, response: Response): Promise<any> {
    if (!uuid) {
      throw new BadRequestException(Errors.NoFileIdProvided);
    }

    const mediaFile = await this.mediaFileRepository.findByUuid(uuid);

    if (!mediaFile) {
      throw new NotFoundException(`File with id ${uuid} not found`);
    }

    const fileBuffer = await fetchFile(mediaFile.url);

    sendFile(response, {
      buffer: fileBuffer,
      mimetype: mediaFile.mimetype
    });
  }

  private prepareFiles(files: File[]): FileToUpload[] {
    return files.map(file => ({
      file,
      type: getFileType(file) as UploadFile
    }));
  }

  private formatResponse(files: string[]): ApiResponse {
    return {
      files
    };
  }
}
