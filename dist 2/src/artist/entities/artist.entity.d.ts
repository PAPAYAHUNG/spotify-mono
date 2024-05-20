import { Song } from 'src/songs/songs.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Artist {
    id: number;
    user: User;
    song: Song[];
}
