/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as speakeasy from 'speakeasy';
import { Verify2FaDto } from './dto/verify-2fa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signIn(signInDto: SignInDto): Promise<
    | {
        access_token: string;
      }
    | {
        validate2FA?: string;
        message: string;
      }
  > {
    const { username, password: dtoPassword } = signInDto || {};
    const user = await this.usersService.findByName(username);

    const match = await bcrypt.compare(dtoPassword, user?.password);
    if (!match) {
      throw new UnauthorizedException();
    }

    if (!user.secretToken || !user.is2faEnabled) {
      return {
        validate2FA: 'http://localhost:3000/auth/2fa',
        message:
          'Please send the one time password/token from your Authentication App',
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

  async generate2FASecret(username: string) {
    if (!username) {
      throw new HttpException(
        "User name can't be empty",
        HttpStatus.NOT_ACCEPTABLE,
        {},
      );
    }
    console.log({ username });
    const secret = speakeasy.generateSecret({ length: 20 });
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND, {});
    }
    console.log({ user });
    user.secretToken = secret.base32;

    // return user;
    return this.userRepository.save(user);
  }

  async verify2FACode(verfify2FADto: Verify2FaDto) {
    const { username, token } = verfify2FADto || {};

    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isAuthorize = speakeasy.totp.verify({
      secret: user.secretToken,
      encoding: 'base32',
      token,
    });

    user.is2faEnabled = isAuthorize;

    return this.userRepository.save(user);
  }

  async disable2FA(username: string) {
    // const user = await this.userRepository.findOne({ where: { username } });

    // if (!user) {
    //   throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    // }

    // user.secretToken = null;
    // user.is2faEnabled = false;

    return this.userRepository.update(
      { username },
      {
        secretToken: '',
        is2faEnabled: false,
      },
    );
  }
}
