import { PrismaService } from './../prisma.service';
import { ExecutionContext } from '@nestjs/common';
import { OidcService } from './oidc/oidc.service';
import { JwtService } from '@nestjs/jwt';
export type TypeJWT = {
    header: {
        kid: string;
        alg: string;
    };
    payload: {
        iss: string;
        email: string;
        preferred_username: string;
    };
};
export declare class AuthService {
    private readonly jwtService;
    readonly oidcService: OidcService;
    readonly prismaService: PrismaService;
    private logger;
    constructor(jwtService: JwtService, oidcService: OidcService, prismaService: PrismaService);
    getTokenDecoded(token: string): TypeJWT;
    getPublicKey(jwt: TypeJWT): import("rxjs").Observable<any>;
    getPublicKeyFromRequest(req: Request): import("rxjs").Observable<any>;
    validate(payload: ExecutionContext): Promise<boolean>;
}
