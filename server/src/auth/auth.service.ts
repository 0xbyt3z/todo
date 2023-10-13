import { PrismaService } from './../prisma.service';
import { JWK } from 'jwk-to-pem';
import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Http2ServerRequest } from 'http2';
import { OidcService } from './oidc/oidc.service';
import { decode } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';

export interface TypeJWT {
  header: { kid: string; alg: string };
  payload: { iss: string; email: string; preferred_username: string };
}

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    readonly oidcService: OidcService,
    readonly prismaService: PrismaService,
  ) {}

  getTokenDecoded(token: string): TypeJWT {
    // decode the JWT
    const jwt = decode(token, {
      complete: true,
    }) as TypeJWT;

    return jwt;
  }

  getPublicKey(jwt: TypeJWT) {
    return this.oidcService.getPublicKey(jwt.header.kid, jwt.header.alg);
  }
  getPublicKeyFromRequest(req: Request) {
    try {
      let token = '';
      const header: string = req.headers['authorization'];

      // make sure the bearer is available
      if (header.split(' ')[0] != 'Bearer') {
        return null;
      }
      token = header.split(' ')[1];
      return this.getPublicKey(this.getTokenDecoded(token));
    } catch (e) {
      this.logger.warn('Missing Headers');
    }
  }

  async validate(payload: ExecutionContext): Promise<boolean> {
    let token = '';

    //check for the context whether it is a typical HTTP request or from the graphql endpoint
    if (payload.getArgs()[0] === undefined) {
      //if true the context is from the graghQL endpoint
      (payload.getArgs()[2].req['rawHeaders'] as []).map((s: string) => {
        if (s.includes('Bearer')) {
          token = s.split(' ')[1];
        }
      });
    } else if (payload.getArgs()[0]['rawHeaders'] !== undefined) {
      (payload.getArgs()[0]['rawHeaders'] as []).map((s: string) => {
        if (s.includes('Bearer')) {
          token = s.split(' ')[1];
        }
      });
    } else {
      //headers may not avaialble sometimes
      //maybe because of side effects
      //or the access_token is collected from the nextauth session and
      //the session may not available at the time of the request
      return false;
    }

    try {
      const secret = await firstValueFrom(
        this.getPublicKey(this.getTokenDecoded(token)),
      );

      this.jwtService.verify(token, {
        secret: secret,
        issuer: this.getTokenDecoded(token).payload.iss,
      });

      //additional checkup with the database
      //check the if the user is existing in the database
      const res = await this.prismaService.user.findUnique({
        where: { email: this.getTokenDecoded(token).payload.email },
        select: { email: true, isBanned: true },
      });
      //reject the request if the user is not existing
      if (res.email == undefined || res.isBanned) {
        return false;
      }
      return true;
    } catch (e) {
      this.logger.warn(e);
      return false;
    }
  }
}
