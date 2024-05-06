import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 }) // Assuming max length of 255 characters for title
  title: string;

  @Column('simple-array') // Represents an array of strings
  author: string[];

  @Column({ type: 'date' })
  releasedDate: Date;

  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'text', nullable: true })
  lyrics?: string; // Optional lyrics field

  // You can add other columns or relationships as needed
}
