import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppConfig } from './providers/config/app.config';
import { ConfigModule } from './providers/config/config.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [AppConfig],
      useFactory: ({ jwtSecret: secret }: AppConfig) => ({ secret })
    })
  ],
  exports: [PassportModule, JwtModule, ConfigModule]
})
export class CommonModule {}
