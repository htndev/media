import { EnhancedBaseEntity } from '@xbeat/server-toolkit';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { UploadFile } from '../common/utils/types.util';

@Entity({ name: 'media_files' })
export class MediaFile extends EnhancedBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  uuid: string;

  @Column()
  url: string;

  @Column({
    type: 'int'
  })
  size: number;

  @Column({
    enum: [UploadFile.Audio, UploadFile.Image]
  })
  type: UploadFile;

  @Column()
  mimetype: string;
}
