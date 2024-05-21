import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SongsService } from './songs.service';
import { HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { Public } from 'src/utils';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateDtoSong } from './dto/update-song-dto';

@Public()
@Resolver()
export class SongsResolver {
  constructor(private songService: SongsService) {}

  @Query()
  async songs() {
    try {
      console.log('hehe');
      return this.songService.findAll();
    } catch (error) {
      throw new HttpException('server got error', HttpStatus.FORBIDDEN, {
        cause: error,
      });
    }
  }

  @Query()
  async song(@Args('id', ParseIntPipe) id: number) {
    this.songService.findOne(id);
  }

  @Mutation()
  async createSong2(@Args('input') input: CreateSongDto) {
    try {
      console.log({ input });
      return this.songService.create(input);
    } catch (error) {
      throw new HttpException(
        'server got error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Mutation()
  async updateSong(
    @Args('id') id: number,
    @Args('input') input: UpdateDtoSong,
  ) {
    try {
      console.log({ id });
      console.log({ input });
      return this.songService.update(id, input);
    } catch (error) {
      throw new HttpException(
        'server got error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
