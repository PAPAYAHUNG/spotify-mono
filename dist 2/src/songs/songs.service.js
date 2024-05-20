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
exports.SongsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const songs_entity_1 = require("./songs.entity");
const typeorm_2 = require("typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let SongsService = class SongsService {
    constructor(songRepository) {
        this.songRepository = songRepository;
        this.songs = [];
    }
    async create(songDTO) {
        console.log({ songDTO });
        const song = new songs_entity_1.Song();
        song.authors = songDTO.authors;
        song.title = songDTO.title;
        song.lyrics = songDTO.lyrics;
        song.duration = songDTO.duration;
        song.releasedDate = songDTO.releasedDate;
        console.log('final', song);
        return await this.songRepository.save(song);
    }
    findAll() {
        return this.songRepository.find();
    }
    findOne(id) {
        console.log({ id });
        return this.songRepository.findOne({ where: { id } });
    }
    findByIds(ids) {
        return this.songRepository.findBy({
            id: (0, typeorm_2.In)(ids),
        });
    }
    update(id, updateSongDto) {
        return this.songRepository.update(id, updateSongDto);
    }
    remove(id) {
        return this.songRepository.delete(id);
    }
    async paginate(options) {
        const queryBuilder = this.songRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.id', 'ASC');
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, options);
    }
};
exports.SongsService = SongsService;
exports.SongsService = SongsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(songs_entity_1.Song)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SongsService);
//# sourceMappingURL=songs.service.js.map