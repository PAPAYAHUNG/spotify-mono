import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('CONFIG')
    private config: any,
  ) {}

  @Get()
  getHello(): string {
    return `${this.appService.getHello()} + ${this.config}`;
  }
}
