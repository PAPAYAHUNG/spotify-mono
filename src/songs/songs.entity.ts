import { Artist } from 'src/artist/entities/artist.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 }) // Assuming max length of 255 characters for title
  title: string;

  @Column('simple-array') // Represents an array of strings
  authors: string[];

  @Column({ type: 'date' })
  releasedDate: Date;

  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'text', nullable: true })
  lyrics?: string; // Optional lyrics field

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artist' })
  artist: Artist[];
}
