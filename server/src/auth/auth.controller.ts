import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { OidcService } from './oidc/oidc.service';
import { AuthService } from './auth.service';
import { RoleGuard } from './role.guard';

@Controller('auth')
export class AuthController {
  constructor(
    readonly oidcService: OidcService,
    readonly authService: AuthService,
  ) {}

  @UseGuards(RoleGuard)
  @Get()
  simpleGet() {
    return 'this route is protected';
  }

  @Get('pub')
  getjwks(@Req() req) {
    return this.authService.getPublicKeyFromRequest(req);
  }
}
