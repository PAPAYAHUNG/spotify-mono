import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { DevConfigService } from 'src/provider/dev-config-service';

@Controller('songs')
// @Controller({
//   path: 'songs',
//   scope: Scope.REQUEST,
// })
export class SongsController {
  constructor(
    private songService: SongsService,
    private devConfigService: DevConfigService,
  ) {}
  @Get()
  findAll() {
    try {
      return this.songService.findAll();
      // return this.devConfigService.getDbHost();
    } catch (error) {
      throw new HttpException('server got error', HttpStatus.FORBIDDEN, {
        cause: error,
      });
    }
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `type of this is ${typeof id}`;
  }
  // @Get(':id')
  // findOne(
  //   @Param('id', ParseIntPipe)
  //   id: number,
  // ) {
  //   return `type of this is ${typeof id}`;
  // }

  @Put(':id')
  update() {
    return 'this is the updated content';
  }

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    console.log('check outside', createSongDto);
    return this.songService.create(createSongDto);
  }

  @Delete(':id')
  delete() {
    return 'this is the delete item';
  }
}
