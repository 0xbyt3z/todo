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
var RoleGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const jwt_1 = require("@nestjs/jwt");
const oidc_service_1 = require("./oidc/oidc.service");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
let RoleGuard = RoleGuard_1 = class RoleGuard {
    constructor(jwtService, reflector, oidcService, configService) {
        this.jwtService = jwtService;
        this.reflector = reflector;
        this.oidcService = oidcService;
        this.configService = configService;
        this.logger = new common_1.Logger(RoleGuard_1.name);
        console.log('can activate menthod call from the custom guard');
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.get('roles', context.getHandler());
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        if (!request.headers.authorization ||
            request.headers.authorization.split(' ').length < 2 ||
            request.headers.authorization.split(' ')[0] != 'Bearer') {
            return false;
        }
        const token = request.headers.authorization.split(' ')[1];
        const realmAccess = this.configService.get('REALM_ACCESS');
        const decoded = this.jwtService.decode(token, { complete: true });
        if (!decoded) {
            return false;
        }
        const secret = await (0, rxjs_1.firstValueFrom)(this.oidcService.getPublicKey(decoded.header.kid, decoded.header.alg));
        const issuer = await (0, rxjs_1.firstValueFrom)(this.oidcService.getIssuerUrl());
        try {
            this.jwtService.verify(token, {
                secret: secret,
                issuer: issuer,
            });
        }
        catch (e) {
            this.logger.warn(e);
            return false;
        }
        if (decoded.payload.resource_access?.[realmAccess]) {
            return decoded.payload.resource_access[realmAccess].roles.some((availableRole) => requiredRoles.includes(availableRole));
        }
        return false;
    }
};
exports.RoleGuard = RoleGuard;
exports.RoleGuard = RoleGuard = RoleGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        core_1.Reflector,
        oidc_service_1.OidcService,
        config_1.ConfigService])
], RoleGuard);
//# sourceMappingURL=role.guard%20copy.js.map