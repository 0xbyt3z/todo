import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle, ThrottlerGuard } from '@nestjs/throttler';

@Controller()
@UseGuards(ThrottlerGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @SkipThrottle()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('rated')
  ratelimite(): string {
    return 'this page is rate limited';
  }
}
