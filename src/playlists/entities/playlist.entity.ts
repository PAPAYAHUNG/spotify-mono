import { Song } from 'src/songs/songs.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  // Define a many-to-many relationship with songs
  @ManyToMany(() => Song)
  @JoinTable({ name: 'playlist_song' })
  songs: Song[];

  // You can add other columns or relationships as needed
}
