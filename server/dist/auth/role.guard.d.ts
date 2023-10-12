import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OidcService } from './oidc/oidc.service';
import { AuthService } from './auth.service';
export declare class RoleGuard implements CanActivate {
    private readonly jwtService;
    private readonly oidcService;
    private readonly authService;
    private logger;
    constructor(jwtService: JwtService, oidcService: OidcService, authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
