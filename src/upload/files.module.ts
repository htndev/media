import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../common/providers/config/config.module';
import { UploaderModule } from '../common/providers/uploader/uploader.module';
import { UuidModule } from '../common/providers/uuid/uuid.module';
import { ValidationService } from '../common/providers/validation/validation.service';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { MediaFileRepository } from '../repositories/media-file.repository';
import { UserRepository } from '../repositories/user.repository';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [UploaderModule, ConfigModule, TypeOrmModule.forFeature([UserRepository, MediaFileRepository]), UuidModule],
  providers: [FilesService, JwtStrategy, ValidationService],
  exports: [JwtStrategy],
  controllers: [FilesController]
})
export class FilesModule {}
