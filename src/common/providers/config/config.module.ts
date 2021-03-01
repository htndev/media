import { Module } from '@nestjs/common';
import { AppConfig, DatabaseConfig } from '@xbeat/server-toolkit';

import { CloudConfig } from './cloud.config';

@Module({
  providers: [AppConfig, DatabaseConfig, CloudConfig],
  exports: [AppConfig, DatabaseConfig, CloudConfig]
})
export class ConfigModule {}
