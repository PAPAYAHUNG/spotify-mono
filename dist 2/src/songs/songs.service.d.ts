import { Song } from './songs.entity';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateDtoSong } from './dto/update-song-dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class SongsService {
    private songRepository;
    constructor(songRepository: Repository<Song>);
    private readonly songs;
    create(songDTO: CreateSongDto): Promise<Song>;
    findAll(): Promise<Song[]>;
    findOne(id: number): Promise<Song>;
    findByIds(ids: number[]): Promise<Song[]>;
    update(id: number, updateSongDto: UpdateDtoSong): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    paginate(options: IPaginationOptions): Promise<Pagination<Song>>;
}
