import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Song } from 'src/songs/songs.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}
  async create(createArtistDto: CreateArtistDto) {
    try {
      const artist = new Artist();
      const user = await this.userRepository.findOne({
        where: { id: createArtistDto.userId },
      });
      const songs = await this.songRepository.findBy({
        id: In(createArtistDto.songs),
      });
      artist.song = songs;
      artist.user = user;
      return this.artistRepository.save(artist);
    } catch (error) {
      console.log({ error });
    }
  }

  async findAll() {
    return this.artistRepository
      .find({
        relations: ['song', 'user'],
      })
      .then((artist) => instanceToPlain(artist));
  }

  async findOne(id: number) {
    return this.artistRepository
      .findOne({
        where: { id },
        relations: ['song', 'user'],
      })
      .then((artist) => instanceToPlain(artist));
  }

  async update(id: number, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    const user = await this.userRepository.findOne({
      where: { id: updateArtistDto.userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND, {});
    }
    const songs =
      (await this.songRepository.findBy({
        id: In(updateArtistDto.songs),
      })) || [];

    artist.song = songs;
    artist.user = user;
    return this.artistRepository.save(artist);
  }

  async remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
