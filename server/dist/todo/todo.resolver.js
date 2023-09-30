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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const todo_model_1 = require("./models/todo.model");
const todo_service_1 = require("./todo.service");
let TodoResolver = class TodoResolver {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async allUsers() {
        return this.todoService.allUsers();
    }
    async getUser(id) {
        return this.todoService.getUser(id);
    }
    async getTodoLists(uId) {
        return this.todoService.getTodoLists(uId);
    }
    async getTodoList(id) {
        return this.todoService.getTodoList(id);
    }
    async addUser(id) {
        return this.todoService.getTodoList(id);
    }
};
exports.TodoResolver = TodoResolver;
__decorate([
    (0, graphql_1.Query)((returns) => [todo_model_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "allUsers", null);
__decorate([
    (0, graphql_1.Query)((returns) => todo_model_1.User),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getUser", null);
__decorate([
    (0, graphql_1.Query)((returns) => [todo_model_1.TodoList]),
    __param(0, (0, graphql_1.Args)('uId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getTodoLists", null);
__decorate([
    (0, graphql_1.Query)((returns) => todo_model_1.TodoList),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getTodoList", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "addUser", null);
exports.TodoResolver = TodoResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoResolver);
//# sourceMappingURL=todo.resolver.js.map