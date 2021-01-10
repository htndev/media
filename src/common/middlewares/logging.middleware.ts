import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';

export class LoggingMiddleware implements NestMiddleware {
  readonly #logger = new Logger('Incoming request');
  use(req: Request, _, next: NextFunction): void {
    this.#logger.verbose(`${req.method} ${req.baseUrl}`);
    next();
  }
}