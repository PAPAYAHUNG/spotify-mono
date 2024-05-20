"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const playlist_entity_1 = require("./entities/playlist.entity");
const typeorm_2 = require("typeorm");
const songs_service_1 = require("../songs/songs.service");
let PlaylistsService = class PlaylistsService {
    constructor(playlistRepository, songsService) {
        this.playlistRepository = playlistRepository;
        this.songsService = songsService;
    }
    async create(createPlaylistDto) {
        const playlist = new playlist_entity_1.Playlist();
        playlist.name = createPlaylistDto.name;
        playlist.description = createPlaylistDto.description;
        const foundSongs = await this.songsService.findByIds(createPlaylistDto.songs);
        playlist.songs = foundSongs;
        return this.playlistRepository.save(playlist);
    }
    findAll() {
        return this.playlistRepository.find({ relations: ['songs'] });
    }
    findOne(id) {
        return this.playlistRepository.findOne({ where: { id } });
    }
    update(id, updatePlaylistDto) {
        console.log({ updatePlaylistDto });
        return 'hihi';
    }
    remove(id) {
        return this.playlistRepository.delete(id);
    }
};
exports.PlaylistsService = PlaylistsService;
exports.PlaylistsService = PlaylistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(playlist_entity_1.Playlist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        songs_service_1.SongsService])
], PlaylistsService);
//# sourceMappingURL=playlists.service.js.map