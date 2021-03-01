import { EnhancedBaseEntity } from '@xbeat/server-toolkit';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users', synchronize: false })
export class User extends EnhancedBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;
}
