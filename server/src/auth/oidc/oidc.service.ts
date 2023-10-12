import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { filter, map, mergeAll, of, switchMap, tap } from 'rxjs';
import jwkToPem, { JWK } from 'jwk-to-pem';

import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

interface OidConfig {
  issuer: string;
  jwks_uri: string;
  token_endpoint: string;
}

interface Jwks {
  keys: ({
    kid: string;
    alg: string;
  } & JWK)[];
}

@Injectable()
export class OidcService implements OnModuleInit {
  private logger: Logger = new Logger(OidcService.name);
  private config: OidConfig;
  private publicKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.getConfig();
  }

  getConfig() {
    if (this.config) {
      this.logger.log('Found Oid config in cache');
      return of(this.config);
    }

    return this.httpService
      .get<OidConfig>(
        `${this.configService.get<string>(
          'KEYCLOAK_BASE_URL',
        )}/realms/${this.configService.get<string>(
          'KEYCLOAK_REALM',
        )}/.well-known/openid-configuration`,
      )
      .pipe(
        tap(() => this.logger.log('Fetched the Oid config')),
        map((response) => response.data),
        tap((config) => (this.config = config)),
      );
  }

  getJwksUrl = () => this.getConfig().pipe(map((config) => config.jwks_uri));

  getIssuerUrl = () => this.getConfig().pipe(map((config) => config.issuer));

  getPublicKey(kid: string, alg: string) {
    if (this.publicKey) {
      this.logger.log('Found the public key in cache');
      return of(this.publicKey);
    }

    return this.getConfig().pipe(
      switchMap((config) => this.httpService.get<Jwks>(config.jwks_uri)),
      tap(() => this.logger.log('Fetched the public key')),
      map((response) => response.data),
      map((jwks) => jwks.keys),
      mergeAll(),
      filter((key) => key.kid === kid && key.alg === alg),
      map((key) => jwkToPem(key)),
      tap((publicKey) => (this.publicKey = publicKey)),
    );
  }
}
