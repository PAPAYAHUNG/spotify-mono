import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { Verify2FaDto } from './dto/verify-2fa.dto';
import { Generate2FADto } from './dto/generate-2fa.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<{
        access_token: string;
    } | {
        validate2FA?: string;
        message: string;
    }>;
    getProfile(req: any): any;
    generate2FASecret(generate2FADto: Generate2FADto): Promise<import("../user/entities/user.entity").User>;
    verify2FACode(verfify2FADto: Verify2FaDto): Promise<import("../user/entities/user.entity").User>;
    disabl2FA(username: string): Promise<import("typeorm").UpdateResult>;
    testEnv(): Promise<any>;
}
