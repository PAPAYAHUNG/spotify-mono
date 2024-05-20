import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
export declare class PlaylistsController {
    private readonly playlistsService;
    constructor(playlistsService: PlaylistsService);
    create(createPlaylistDto: CreatePlaylistDto): Promise<import("./entities/playlist.entity").Playlist>;
    findAll(): Promise<import("./entities/playlist.entity").Playlist[]>;
    findOne(id: string): Promise<import("./entities/playlist.entity").Playlist>;
    update(id: string, updatePlaylistDto: UpdatePlaylistDto): string;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
