import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
interface OidConfig {
    issuer: string;
    jwks_uri: string;
    token_endpoint: string;
}
export declare class OidcService implements OnModuleInit {
    private readonly httpService;
    private readonly configService;
    private logger;
    private config;
    private publicKey;
    constructor(httpService: HttpService, configService: ConfigService);
    onModuleInit(): void;
    getConfig(): import("rxjs").Observable<OidConfig>;
    getJwksUrl: () => import("rxjs").Observable<string>;
    getIssuerUrl: () => import("rxjs").Observable<string>;
    getPublicKey(kid: string, alg: string): import("rxjs").Observable<any>;
}
export {};
