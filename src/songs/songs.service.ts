import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './songs.entity';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song-dto';

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

    song.author = songDTO.author;
    song.title = songDTO.title;
    song.lyrics = songDTO.lyrics;
    song.duration = songDTO.duration;
    song.releasedDate = songDTO.releasedDate;

    console.log('final', song);
    return await this.songRepository.save(song);
  }
  findAll() {
    // throw new Error('Server error');
    // return this.songs;
    return this.songRepository.find();
  }
  findOne(id) {
    return `type of this is ${typeof id}`;
  }
}
