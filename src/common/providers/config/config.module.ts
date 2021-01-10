import { Module } from '@nestjs/common';

import { AppConfig } from './app.config';
import { CloudConfig } from './cloud.config';
import { DatabaseConfig } from './database.config';

@Module({
  providers: [AppConfig, DatabaseConfig, CloudConfig],
  exports: [AppConfig, DatabaseConfig, CloudConfig]
})
export class ConfigModule {}
