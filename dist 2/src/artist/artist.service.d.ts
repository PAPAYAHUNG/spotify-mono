import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Song } from 'src/songs/songs.entity';
export declare class ArtistService {
    private artistRepository;
    private userRepository;
    private songRepository;
    constructor(artistRepository: Repository<Artist>, userRepository: Repository<User>, songRepository: Repository<Song>);
    create(createArtistDto: CreateArtistDto): Promise<Artist>;
    findAll(): Promise<Record<string, any>>;
    findOne(id: number): Promise<Record<string, any>>;
    update(id: number, updateArtistDto: UpdateArtistDto): Promise<Artist>;
    remove(id: number): Promise<string>;
}
