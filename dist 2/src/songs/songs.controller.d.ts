import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { DevConfigService } from 'src/provider/dev-config-service';
import { UpdateDtoSong } from './dto/update-song-dto';
export declare class SongsController {
    private songService;
    private devConfigService;
    constructor(songService: SongsService, devConfigService: DevConfigService);
    findAll(page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("./songs.entity").Song, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findOne(id: number): Promise<import("./songs.entity").Song>;
    findByIds(ids: string): Promise<import("./songs.entity").Song[]>;
    update(id: number, updateDTOSong: UpdateDtoSong): Promise<import("typeorm").UpdateResult>;
    create(createSongDto: CreateSongDto): Promise<import("./songs.entity").Song>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
