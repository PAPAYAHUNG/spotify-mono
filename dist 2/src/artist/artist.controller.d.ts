import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
export declare class ArtistController {
    private readonly artistService;
    constructor(artistService: ArtistService);
    create(createArtistDto: CreateArtistDto): Promise<import("./entities/artist.entity").Artist>;
    findAll(): Promise<Record<string, any>>;
    findOne(id: string): Promise<Record<string, any>>;
    update(id: string, updateArtistDto: UpdateArtistDto): Promise<import("./entities/artist.entity").Artist>;
    remove(id: string): Promise<string>;
}
