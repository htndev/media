import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';

import { MediaFileRepository } from '../../../repositories/media-file.repository';

@Injectable()
export class UuidService {
  constructor(@InjectRepository(MediaFileRepository) private readonly mediaFileRepository: MediaFileRepository) {}

  async generateUuid(): Promise<string> {
    const _uuid = uuid();
    const uuidExists = await this.uuidExists(_uuid);

    return !uuidExists ? _uuid : this.generateUuid();
  }

  async uuidExists(uuid: string): Promise<boolean> {
    const file = await this.mediaFileRepository.findByUuid(uuid);
    return !!file;
  }
}
