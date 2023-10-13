"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_service_1 = require("./../prisma.service");
const common_1 = require("@nestjs/common");
const oidc_service_1 = require("./oidc/oidc.service");
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_1 = require("@nestjs/jwt");
const rxjs_1 = require("rxjs");
let AuthService = AuthService_1 = class AuthService {
    constructor(jwtService, oidcService, prismaService) {
        this.jwtService = jwtService;
        this.oidcService = oidcService;
        this.prismaService = prismaService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    getTokenDecoded(token) {
        const jwt = (0, jsonwebtoken_1.decode)(token, {
            complete: true,
        });
        return jwt;
    }
    getPublicKey(jwt) {
        return this.oidcService.getPublicKey(jwt.header.kid, jwt.header.alg);
    }
    getPublicKeyFromRequest(req) {
        try {
            let token = '';
            const header = req.headers['authorization'];
            if (header.split(' ')[0] != 'Bearer') {
                return null;
            }
            token = header.split(' ')[1];
            return this.getPublicKey(this.getTokenDecoded(token));
        }
        catch (e) {
            this.logger.warn('Missing Headers');
        }
    }
    async validate(payload) {
        let token = '';
        if (payload.getArgs()[0] === undefined) {
            payload.getArgs()[2].req['rawHeaders'].map((s) => {
                if (s.includes('Bearer')) {
                    token = s.split(' ')[1];
                }
            });
        }
        else if (payload.getArgs()[0]['rawHeaders'] !== undefined) {
            payload.getArgs()[0]['rawHeaders'].map((s) => {
                if (s.includes('Bearer')) {
                    token = s.split(' ')[1];
                }
            });
        }
        else {
            return false;
        }
        try {
            const secret = await (0, rxjs_1.firstValueFrom)(this.getPublicKey(this.getTokenDecoded(token)));
            this.jwtService.verify(token, {
                secret: secret,
                issuer: this.getTokenDecoded(token).payload.iss,
            });
            const res = await this.prismaService.user.findUnique({
                where: { email: this.getTokenDecoded(token).payload.email },
                select: { email: true, isBanned: true },
            });
            if (res.email == undefined || res.isBanned) {
                return false;
            }
            return true;
        }
        catch (e) {
            this.logger.warn(e);
            return false;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        oidc_service_1.OidcService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map