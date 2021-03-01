import { Injectable } from '@nestjs/common';
import { Maybe } from '@xbeat/toolkit';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUser({ username, email }: { username: string; email: string }): Promise<Maybe<User>> {
    return this.findOne({ username, email });
  }
}
