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
const jwt_1 = require("@nestjs/jwt");
const oidc_service_1 = require("./oidc/oidc.service");
const auth_service_1 = require("./auth.service");
let RoleGuard = RoleGuard_1 = class RoleGuard {
    constructor(jwtService, oidcService, authService) {
        this.jwtService = jwtService;
        this.oidcService = oidcService;
        this.authService = authService;
        this.logger = new common_1.Logger(RoleGuard_1.name);
        console.log('can activate menthod call from the custom guard');
    }
    async canActivate(context) {
        const isUserValid = this.authService.validate(context);
        return isUserValid;
    }
};
exports.RoleGuard = RoleGuard;
exports.RoleGuard = RoleGuard = RoleGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        oidc_service_1.OidcService,
        auth_service_1.AuthService])
], RoleGuard);
//# sourceMappingURL=role.guard.js.map