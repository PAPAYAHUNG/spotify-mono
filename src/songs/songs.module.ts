import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { DevConfigService } from 'src/provider/dev-config-service';

// const mockFindAll = {
//   findAll() {
//     return [{ id: 1, title: 'hehe' }];
//   },
// };
@Module({
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
})
export class SongsModule {}
