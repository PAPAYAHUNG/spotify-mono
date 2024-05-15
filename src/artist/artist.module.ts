import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { SongsModule } from 'src/songs/songs.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Artist]), SongsModule, UserModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
