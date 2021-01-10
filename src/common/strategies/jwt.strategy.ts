import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { MEDIA_SCOPE } from '../constants/common.constant';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AppConfig } from '../providers/config/app.config';
import { Maybe } from '../utils/types.util';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository, appConfig: AppConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig.jwtSecret
    });
  }

  async validate({ username, email, scope }: JwtPayload): Promise<Maybe<User>> {
    if (scope !== MEDIA_SCOPE) {
      throw new UnauthorizedException();
    }

    return this.userRepository.findUser({ username, email });
  }
}
