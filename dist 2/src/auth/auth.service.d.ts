import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { Verify2FaDto } from './dto/verify-2fa.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private usersService;
    private jwtService;
    private userRepository;
    private configService;
    constructor(usersService: UserService, jwtService: JwtService, userRepository: Repository<User>, configService: ConfigService);
    signIn(signInDto: SignInDto): Promise<{
        access_token: string;
    } | {
        validate2FA?: string;
        message: string;
    }>;
    generate2FASecret(username: string): Promise<User>;
    verify2FACode(verfify2FADto: Verify2FaDto): Promise<User>;
    disable2FA(username: string): Promise<import("typeorm").UpdateResult>;
    testEnv(): Promise<any>;
}
