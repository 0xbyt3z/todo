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

@Injectable()
export class RoleGuard implements CanActivate {
  private logger: Logger = new Logger(RoleGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly oidcService: OidcService,
    private readonly configService: ConfigService,
  ) {
    console.log('can activate menthod call from the custom guard');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // const request = context.switchToHttp().getRequest<Request>();
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    if (
      !request.headers.authorization ||
      request.headers.authorization.split(' ').length < 2 ||
      request.headers.authorization.split(' ')[0] != 'Bearer'
    ) {
      return false;
    }

    const token = request.headers.authorization.split(' ')[1];

    const realmAccess = this.configService.get<string>('REALM_ACCESS');

    const decoded = this.jwtService.decode(token, { complete: true }) as {
      header: {
        kid: string;
        alg: string;
      };
      payload: {
        resource_access: Record<
          string,
          {
            roles: string[];
          }
        >;
      };
    };

    if (!decoded) {
      return false;
    }

    const secret = await firstValueFrom(
      this.oidcService.getPublicKey(decoded.header.kid, decoded.header.alg),
    );

    const issuer = await firstValueFrom(this.oidcService.getIssuerUrl());

    try {
      this.jwtService.verify(token, {
        secret: secret,
        issuer: issuer,
      });
    } catch (e) {
      this.logger.warn(e);
      return false;
    }

    if (decoded.payload.resource_access?.[realmAccess]) {
      return decoded.payload.resource_access[realmAccess].roles.some(
        (availableRole) => requiredRoles.includes(availableRole),
      );
    }
    return false;
  }
}
