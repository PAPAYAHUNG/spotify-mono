// create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
} from 'class-validator';
import { Role } from 'src/role/role.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'hungle',
    description: 'This is the name of user',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'email',
    description: 'This is the email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'fasdfsad',
    description: 'This is the password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: ['user', 'admin'],
    description: 'This is role array',
  })
  @IsOptional()
  roles: Role[];
}
