import { Artist } from 'src/artist/entities/artist.entity';
export declare class Song {
    id: number;
    title: string;
    authors: string[];
    releasedDate: Date;
    duration: Date;
    lyrics?: string;
    artist: Artist[];
}
