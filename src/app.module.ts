import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
/* The line `import { SongsModule } from './songs/songs.module';` is importing the `SongsModule` from
the `songs/songs.module.ts` file in the project. This import statement allows the `AppModule` to use
and include the functionality provided by the `SongsModule` within its own module. This is a common
practice in NestJS applications to organize and modularize the codebase by breaking it down into
smaller, manageable modules. */
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { DevConfigService } from './provider/dev-config-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/songs.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { Playlist } from './playlists/entities/playlist.entity';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { Artist } from './artist/entities/artist.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root1234',
      database: 'nest',
      entities: [Song, Playlist, Artist, User],
      synchronize: true,
    }),
    SongsModule,
    PlaylistsModule,
    ArtistModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useValue: true ? 'value1' : 'value2',
    },
  ],
  exports: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log('check', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1
    // consumer.apply(LoggerMiddleware).forRoutes({
    //   path: 'songs',
    //   method: RequestMethod.POST,
    // }); // option no 2
    // consumer.apply(LoggerMiddleware).forRoutes(SongsController); // option no 2
  }
}
