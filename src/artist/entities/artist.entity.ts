import { Song } from 'src/songs/songs.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Song, (song) => song.artist)
  songs: Song[];
}
