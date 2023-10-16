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
import { Roles } from './decorator/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  private logger: Logger = new Logger(RoleGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly oidcService: OidcService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //go with this if you are using the a reflector decorator
    const requiredRoles = this.reflector.get<string[]>(
      Roles,
      context.getClass(),
    );

    //use this if you use @setMetaData decorator for route handlers
    // const requiredRoles = this.reflector.get<string[]>(
    //   'roles',
    //   context.getHandler(),
    // );

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

    const decoded = this.jwtService.decode(token, { complete: true }) as {
      header: {
        kid: string;
        alg: string;
      };
      payload: {
        azp: string;
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

    if (decoded.payload.resource_access?.[decoded.payload.azp]) {
      return decoded.payload.resource_access[decoded.payload.azp].roles.some(
        (availableRole) => requiredRoles.includes(availableRole),
      );
    }
    return false;
  }
}

// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   Logger,
// } from '@nestjs/common';

// import { ConfigService } from '@nestjs/config';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { JwtService } from '@nestjs/jwt';
// import { OidcService } from './oidc/oidc.service';
// import { Reflector } from '@nestjs/core';
// import { firstValueFrom } from 'rxjs';
// import { AuthService } from './auth.service';

// @Injectable()
// export class RoleGuard implements CanActivate {
//   private logger: Logger = new Logger(RoleGuard.name);

//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly oidcService: OidcService,
//     private readonly authService: AuthService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const isUserValid = this.authService.validate(context);

//     return isUserValid;
//   }
// }
