import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateArtistDto {
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsDateString()
  @IsOptional()
  readonly isJoinedDay: Date;
}
