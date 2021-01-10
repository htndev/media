import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaFileRepository } from '../../../repositories/media-file.repository';
import { UuidService } from './uuid.service';

@Module({
  imports: [TypeOrmModule.forFeature([MediaFileRepository])],
  providers: [UuidService],
  exports: [UuidService]
})
export class UuidModule {}
