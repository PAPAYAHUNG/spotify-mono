// user.entity.ts

import { Exclude } from 'class-transformer';
import { Role } from 'src/role/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: 'male' })
  gender: string;

  @Column('simple-array')
  roles: Role[];

  @Column({ default: '' })
  @Exclude()
  secretToken: string;

  @Column({ default: false })
  @Exclude()
  is2faEnabled: boolean;
}
