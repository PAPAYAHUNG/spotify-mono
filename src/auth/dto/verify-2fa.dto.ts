import { IsNotEmpty, IsString } from 'class-validator';

export class Verify2FaDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
