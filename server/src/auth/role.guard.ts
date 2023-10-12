import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { OidcService } from './oidc/oidc.service';
import { Reflector } from '@nestjs/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
  private logger: Logger = new Logger(RoleGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly oidcService: OidcService,
    private readonly authService: AuthService,
  ) {
    console.log('can activate menthod call from the custom guard');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isUserValid = this.authService.validate(context);

    return isUserValid;
  }
}
