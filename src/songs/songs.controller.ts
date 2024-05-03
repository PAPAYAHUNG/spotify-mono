import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}
  @Get()
  findAll() {
    return this.songService.findAll();
  }

  @Get(':id')
  findOne() {
    return 'This is only 1 song base on the id';
  }

  @Put(':id')
  update() {
    return 'this is the updated content';
  }

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songService.create(createSongDto);
  }

  @Delete(':id')
  delete() {
    return 'this is the delete item';
  }
}
