import { Song } from 'src/songs/songs.entity';
export declare class Playlist {
    id: number;
    name: string;
    description?: string;
    songs: Song[];
}
