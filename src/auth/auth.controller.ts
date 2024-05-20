import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/utils';
import { Verify2FaDto } from './dto/verify-2fa.dto';
import { Generate2FADto } from './dto/generate-2fa.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('2fa')
  generate2FASecret(@Body() generate2FADto: Generate2FADto) {
    return this.authService.generate2FASecret(generate2FADto.username);
  }

  @Get('2fa-verify')
  verify2FACode(@Body() verfify2FADto: Verify2FaDto) {
    return this.authService.verify2FACode(verfify2FADto);
  }

  @Delete('2fa')
  disabl2FA(@Body('username') username: string) {
    return this.authService.disable2FA(username);
  }

  @Get('test-env')
  testEnv() {
    return this.authService.testEnv();
  }
}
