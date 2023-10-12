import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OidcService } from './oidc/oidc.service';
import { Reflector } from '@nestjs/core';
export declare class RoleGuard implements CanActivate {
    private readonly jwtService;
    private readonly reflector;
    private readonly oidcService;
    private readonly configService;
    private logger;
    constructor(jwtService: JwtService, reflector: Reflector, oidcService: OidcService, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
