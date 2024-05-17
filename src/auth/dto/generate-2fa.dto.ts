import { IsNotEmpty, IsString } from 'class-validator';

export class Generate2FADto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
