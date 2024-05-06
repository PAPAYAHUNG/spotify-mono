import { Injectable } from '@nestjs/common';

@Injectable()
// @Injectable({ scope: Scope.REQUEST })
export class SongsService {
  private readonly songs = [];
  create(song) {
    console.log({ song });
    this.songs.push(song);
    return this.songs;
  }
  findAll() {
    // throw new Error('Server error');
    return this.songs;
  }
  findOne(id) {
    return `type of this is ${typeof id}`;
  }
}
