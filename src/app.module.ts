import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfig, NodeEnvironment, RequestLoggerMiddleware } from '@xbeat/server-toolkit';

import { CommonModule } from './common/common.module';
import { ConfigModule as ConfigManagerModule } from './common/providers/config/config.module';
import { UuidModule } from './common/providers/uuid/uuid.module';
import { FilesModule } from './upload/files.module';

@Module({
  imports: [
    UuidModule,
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      ignoreEnvFile: process.env.NODE_ENV === NodeEnvironment.PRODUCTION
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigManagerModule],
      inject: [DatabaseConfig],
      useFactory: ({
        type,
        host,
        port,
        username,
        password,
        database,
        synchronize,
        logging,
        dbConnectionRetryAttempts: retryAttempts
      }: DatabaseConfig) =>
        ({
          type,
          host,
          port,
          username,
          password,
          database,
          synchronize,
          logging,
          retryAttempts,
          entities: [`${__dirname}/entities/*.entity.{ts,js}`]
        } as TypeOrmModuleOptions)
    }),
    CommonModule,
    FilesModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
