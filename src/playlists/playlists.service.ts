import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { SongsService } from 'src/songs/songs.service';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    private readonly songsService: SongsService,
  ) {}
  async create(createPlaylistDto: CreatePlaylistDto) {
    const playlist = new Playlist();
    playlist.name = createPlaylistDto.name;
    playlist.description = createPlaylistDto.description;

    const foundSongs = await this.songsService.findByIds(
      createPlaylistDto.songs,
    );

    playlist.songs = foundSongs;

    return this.playlistRepository.save(playlist);
  }

  findAll() {
    return this.playlistRepository.find({ relations: ['songs'] });
  }

  findOne(id: number) {
    return this.playlistRepository.findOne({ where: { id } });
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    console.log({ updatePlaylistDto });
    return 'hihi';
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
