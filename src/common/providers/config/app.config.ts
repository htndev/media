import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';

import { BaseConfig } from './base.config';

interface AppConfigProps {
  PORT: number;
  ALLOWED_HEADERS: string;
  ALLOWED_DOMAINS: string;
  API_VERSION: string;
  ENABLE_SWAGGER: boolean;
  APP_HOSTNAME: string;
  JWT_SECRET: string;
}

@Injectable()
export class AppConfig extends BaseConfig<AppConfigProps> {
  getSchema(): Joi.ObjectSchema {
    return Joi.object({
      PORT: Joi.number().required(),
      ALLOWED_HEADERS: Joi.string().default('*'),
      ALLOWED_DOMAINS: Joi.string().default('*'),
      ENABLE_SWAGGER: Joi.boolean().default(true),
      APP_HOSTNAME: Joi.string().required(),
      API_VERSION: Joi.string().required(),
      JWT_SECRET: Joi.string().required()
    });
  }

  get port(): number {
    return this.config.PORT;
  }

  get allowedHeaders(): string[] {
    return this.config.ALLOWED_HEADERS.split(',');
  }

  get allowedDomains(): string[] {
    return this.config.ALLOWED_DOMAINS.split(',');
  }

  get enableSwagger(): boolean {
    return this.config.ENABLE_SWAGGER;
  }

  get appHostname(): string {
    return this.config.APP_HOSTNAME;
  }

  get apiVersion(): string {
    return this.config.API_VERSION;
  }

  get isLocalhost(): boolean {
    return this.appHostname.includes('localhost');
  }

  get url(): string {
    const port = this.isLocalhost ? `:${this.port}` : '';

    return `http${this.isLocalhost ? '' : 's'}://${this.appHostname}${port}`;
  }

  get apiUrl(): string {
    return `${this.url}/${this.apiVersion}`;
  }

  get jwtSecret(): string {
    return this.config.JWT_SECRET;
  }
}
