import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { DevConfigService } from 'src/provider/dev-config-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './songs.entity';
import { CaslModule } from 'src/casl/casl.module';
import { SongsResolver } from './songs.resolver';

// const mockFindAll = {
//   findAll() {
//     return [{ id: 1, title: 'hehe' }];
//   },
// };
@Module({
  imports: [TypeOrmModule.forFeature([Song]), CaslModule],
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
    SongsResolver,
  ],
  exports: [TypeOrmModule, SongsService],
})
export class SongsModule {}
