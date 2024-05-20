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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const speakeasy = require("speakeasy");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(usersService, jwtService, userRepository, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.configService = configService;
    }
    async signIn(signInDto) {
        const { username, password: dtoPassword } = signInDto || {};
        const user = await this.usersService.findByName(username);
        const match = await bcrypt.compare(dtoPassword, user?.password);
        if (!match) {
            throw new common_1.UnauthorizedException();
        }
        if (!user.secretToken || !user.is2faEnabled) {
            return {
                validate2FA: 'http://localhost:3000/auth/2fa',
                message: 'Please send the one time password/token from your Authentication App',
            };
        }
        const payload = {
            sub: user.id,
            username: user.username,
            roles: user.roles,
        };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async generate2FASecret(username) {
        if (!username) {
            throw new common_1.HttpException("User name can't be empty", common_1.HttpStatus.NOT_ACCEPTABLE, {});
        }
        console.log({ username });
        const secret = speakeasy.generateSecret({ length: 20 });
        const user = await this.userRepository.findOne({
            where: { username },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND, {});
        }
        console.log({ user });
        user.secretToken = secret.base32;
        return this.userRepository.save(user);
    }
    async verify2FACode(verfify2FADto) {
        const { username, token } = verfify2FADto || {};
        const user = await this.userRepository.findOne({
            where: { username },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const isAuthorize = speakeasy.totp.verify({
            secret: user.secretToken,
            encoding: 'base32',
            token,
        });
        user.is2faEnabled = isAuthorize;
        return this.userRepository.save(user);
    }
    async disable2FA(username) {
        return this.userRepository.update({ username }, {
            secretToken: '',
            is2faEnabled: false,
        });
    }
    async testEnv() {
        return this.configService.get('port');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        typeorm_2.Repository,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map