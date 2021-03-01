import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig, JwtStrategyFactory } from '@xbeat/server-toolkit';

import { ConfigModule } from '../common/providers/config/config.module';
import { UploaderModule } from '../common/providers/uploader/uploader.module';
import { UuidModule } from '../common/providers/uuid/uuid.module';
import { ValidationService } from '../common/providers/validation/validation.service';
import { MediaFileRepository } from '../repositories/media-file.repository';
import { UserRepository } from '../repositories/user.repository';
import { MEDIA_SCOPE } from '../common/constants/common.constant';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

const JwtStrategy = JwtStrategyFactory(MEDIA_SCOPE, UserRepository, AppConfig);

@Module({
  imports: [UploaderModule, ConfigModule, TypeOrmModule.forFeature([UserRepository, MediaFileRepository]), UuidModule],
  providers: [FilesService, JwtStrategy, ValidationService],
  exports: [JwtStrategy],
  controllers: [FilesController]
})
export class FilesModule {}
