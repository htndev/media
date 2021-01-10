import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { UploaderService } from './uploader.service';

@Module({
  imports: [ConfigModule],
  providers: [UploaderService],
  exports: [UploaderService]
})
export class UploaderModule {}
