import { Maybe } from '@xbeat/toolkit';
import { EntityRepository, Repository } from 'typeorm';

import { MediaFile } from '../entities/media-file.entity';

@EntityRepository(MediaFile)
export class MediaFileRepository extends Repository<MediaFile> {
  async findByUuid(uuid: string): Promise<Maybe<MediaFile>> {
    return this.findOne({ uuid });
  }
}
