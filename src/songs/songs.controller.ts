import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { DevConfigService } from 'src/provider/dev-config-service';
import { UpdateDtoSong } from './dto/update-song-dto';

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
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number = 1,
  ) {
    try {
      // return this.songService.findAll();
      // return this.devConfigService.getDbHost();
      return this.songService.paginate({
        page,
        limit,
      });
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
    return this.songService.findOne(id);
  }

  @Get('by-ids/:ids')
  findByIds(
    @Param('ids')
    ids: string,
  ) {
    const songIds = ids?.split(',').map((id) => parseInt(id));
    return this.songService.findByIds(songIds);
  }
  // @Get(':id')
  // findOne(
  //   @Param('id', ParseIntPipe)
  //   id: number,
  // ) {
  //   return `type of this is ${typeof id}`;
  // }

  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateDTOSong: UpdateDtoSong,
  ) {
    return this.songService.update(id, updateDTOSong);
  }

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    console.log('check outside', createSongDto);
    return this.songService.create(createSongDto);
  }

  @Delete(':id')
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.songService.remove(id);
  }
}
