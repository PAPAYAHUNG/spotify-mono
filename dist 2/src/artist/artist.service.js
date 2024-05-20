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
exports.ArtistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const artist_entity_1 = require("./entities/artist.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const songs_entity_1 = require("../songs/songs.entity");
const class_transformer_1 = require("class-transformer");
let ArtistService = class ArtistService {
    constructor(artistRepository, userRepository, songRepository) {
        this.artistRepository = artistRepository;
        this.userRepository = userRepository;
        this.songRepository = songRepository;
    }
    async create(createArtistDto) {
        try {
            const artist = new artist_entity_1.Artist();
            const user = await this.userRepository.findOne({
                where: { id: createArtistDto.userId },
            });
            const songs = await this.songRepository.findBy({
                id: (0, typeorm_2.In)(createArtistDto.songs),
            });
            artist.song = songs;
            artist.user = user;
            return this.artistRepository.save(artist);
        }
        catch (error) {
            console.log({ error });
        }
    }
    async findAll() {
        return this.artistRepository
            .find({
            relations: ['song', 'user'],
        })
            .then((artist) => (0, class_transformer_1.instanceToPlain)(artist));
    }
    async findOne(id) {
        return this.artistRepository
            .findOne({
            where: { id },
            relations: ['song', 'user'],
        })
            .then((artist) => (0, class_transformer_1.instanceToPlain)(artist));
    }
    async update(id, updateArtistDto) {
        const artist = await this.artistRepository.findOne({ where: { id } });
        const user = await this.userRepository.findOne({
            where: { id: updateArtistDto.userId },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND, {});
        }
        const songs = (await this.songRepository.findBy({
            id: (0, typeorm_2.In)(updateArtistDto.songs),
        })) || [];
        artist.song = songs;
        artist.user = user;
        return this.artistRepository.save(artist);
    }
    async remove(id) {
        return `This action removes a #${id} artist`;
    }
};
exports.ArtistService = ArtistService;
exports.ArtistService = ArtistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(artist_entity_1.Artist)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(songs_entity_1.Song)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ArtistService);
//# sourceMappingURL=artist.service.js.map