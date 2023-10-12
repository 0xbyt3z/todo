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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var OidcService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OidcService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const jwk_to_pem_1 = __importDefault(require("jwk-to-pem"));
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
let OidcService = OidcService_1 = class OidcService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(OidcService_1.name);
        this.getJwksUrl = () => this.getConfig().pipe((0, rxjs_1.map)((config) => config.jwks_uri));
        this.getIssuerUrl = () => this.getConfig().pipe((0, rxjs_1.map)((config) => config.issuer));
    }
    onModuleInit() {
        this.getConfig();
    }
    getConfig() {
        if (this.config) {
            this.logger.log('Found Oid config in cache');
            return (0, rxjs_1.of)(this.config);
        }
        return this.httpService
            .get(`${this.configService.get('KEYCLOAK_BASE_URL')}/realms/${this.configService.get('KEYCLOAK_REALM')}/.well-known/openid-configuration`)
            .pipe((0, rxjs_1.tap)(() => this.logger.log('Fetched the Oid config')), (0, rxjs_1.map)((response) => response.data), (0, rxjs_1.tap)((config) => (this.config = config)));
    }
    getPublicKey(kid, alg) {
        if (this.publicKey) {
            this.logger.log('Found the public key in cache');
            return (0, rxjs_1.of)(this.publicKey);
        }
        return this.getConfig().pipe((0, rxjs_1.switchMap)((config) => this.httpService.get(config.jwks_uri)), (0, rxjs_1.tap)(() => this.logger.log('Fetched the public key')), (0, rxjs_1.map)((response) => response.data), (0, rxjs_1.map)((jwks) => jwks.keys), (0, rxjs_1.mergeAll)(), (0, rxjs_1.filter)((key) => key.kid === kid && key.alg === alg), (0, rxjs_1.map)((key) => (0, jwk_to_pem_1.default)(key)), (0, rxjs_1.tap)((publicKey) => (this.publicKey = publicKey)));
    }
};
exports.OidcService = OidcService;
exports.OidcService = OidcService = OidcService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], OidcService);
//# sourceMappingURL=oidc.service.js.map