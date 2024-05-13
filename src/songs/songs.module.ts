import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { DevConfigService } from 'src/provider/dev-config-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './songs.entity';

// const mockFindAll = {
//   findAll() {
//     return [{ id: 1, title: 'hehe' }];
//   },
// };
@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongsController],
  // providers: [SongsService],
  // providers: [
  //   {
  //     useClass: SongsService,
  //     provide: SongsService,
  //   },
  // ],
  providers: [
    // {
    //   provide: SongsService,
    //   useValue: mockFindAll,
    // },
    SongsService,
    DevConfigService,
  ],
  exports: [TypeOrmModule, SongsService],
})
export class SongsModule {}
