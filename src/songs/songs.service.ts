import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './songs.entity';
import { In, Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateDtoSong } from './dto/update-song-dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
// @Injectable({ scope: Scope.REQUEST })
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}
  private readonly songs = [];
  async create(songDTO: CreateSongDto): Promise<Song> {
    // this.songs.push(song);

    console.log({ songDTO });
    const song = new Song();

    song.authors = songDTO.authors;
    song.title = songDTO.title;
    song.lyrics = songDTO.lyrics;
    song.duration = songDTO.duration;
    song.releasedDate = songDTO.releasedDate;

    console.log('final', song);
    return await this.songRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    // throw new Error('Server error');
    // return this.songs;

    return this.songRepository.find();
  }

  findOne(id: number) {
    console.log({ id });
    // const foundSong = this.songRepository.findOneById(id);
    // if (!foundSong) {
    //   return `User with id ${id} is not found`;
    // }
    // return foundSong;
    return this.songRepository.findOne({ where: { id } });
  }

  findByIds(ids: number[]): Promise<Song[]> {
    return this.songRepository.findBy({
      id: In(ids),
    });
  }

  update(id: number, updateSongDto: UpdateDtoSong) {
    console.log('check', id, updateSongDto);
    return this.songRepository.update(id, updateSongDto);
  }

  remove(id: number) {
    return this.songRepository.delete(id);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.id', 'ASC');

    return paginate<Song>(queryBuilder, options);
  }
}
