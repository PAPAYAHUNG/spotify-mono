import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './role/role.guard';
import { AuthGuard } from './auth/auth.guard';

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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
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
