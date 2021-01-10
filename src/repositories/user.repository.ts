import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Maybe } from '../common/utils/types.util';
import { User } from '../entities/user.entity';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUser({ username, email }: { username: string; email: string }): Promise<Maybe<User>> {
    return this.findOne({ username, email });
  }
}
