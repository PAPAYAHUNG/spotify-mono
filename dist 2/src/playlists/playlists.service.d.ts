import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { SongsService } from 'src/songs/songs.service';
export declare class PlaylistsService {
    private playlistRepository;
    private readonly songsService;
    constructor(playlistRepository: Repository<Playlist>, songsService: SongsService);
    create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist>;
    findAll(): Promise<Playlist[]>;
    findOne(id: number): Promise<Playlist>;
    update(id: number, updatePlaylistDto: UpdatePlaylistDto): string;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
