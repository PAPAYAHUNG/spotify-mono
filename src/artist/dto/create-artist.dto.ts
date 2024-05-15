import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateArtistDto {
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

  @IsDateString()
  @IsOptional()
  readonly isJoinedDay: Date;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  readonly songs: number[];
}
