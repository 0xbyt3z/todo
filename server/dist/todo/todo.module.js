"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModule = void 0;
const common_1 = require("@nestjs/common");
const todo_resolver_1 = require("./todo.resolver");
const todo_service_1 = require("./todo.service");
const prisma_service_1 = require("../prisma.service");
const todo_controller_1 = require("./todo.controller");
const jwt_1 = require("@nestjs/jwt");
const oidc_service_1 = require("../auth/oidc/oidc.service");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../auth/auth.service");
let TodoModule = class TodoModule {
};
exports.TodoModule = TodoModule;
exports.TodoModule = TodoModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [
            todo_resolver_1.TodoResolver,
            todo_service_1.TodoService,
            prisma_service_1.PrismaService,
            jwt_1.JwtService,
            oidc_service_1.OidcService,
            config_1.ConfigService,
            auth_service_1.AuthService,
        ],
        controllers: [todo_controller_1.TodoController],
    })
], TodoModule);
//# sourceMappingURL=todo.module.js.map