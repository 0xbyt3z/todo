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
const user_input_1 = require("./dto/user.input");
const todo_input_1 = require("./dto/todo.input");
const todolist_input_1 = require("./dto/todolist.input");
const cat_input_1 = require("./dto/cat.input");
const common_1 = require("@nestjs/common");
const currentuser_decorator_1 = require("../auth/decorator/currentuser.decorator");
const role_guard_1 = require("../auth/role.guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
let TodoResolver = class TodoResolver {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async currentUser(user) {
        return user;
    }
    async allUsers() {
        return this.todoService.allUsers();
    }
    async getUser(email) {
        return this.todoService.getUser(email);
    }
    async getRefreshToken(email) {
        return this.todoService.getRefreshToken(email);
    }
    async getTodoLists(user) {
        return this.todoService.getTodoLists(user);
    }
    async getTodoListsWithPagiantion(args, user) {
        return this.todoService.getTodoListsWithPagination(args, user);
    }
    async getTodoList(id) {
        return this.todoService.getTodoList(id);
    }
    async getUserCategories(user) {
        return this.todoService.getUserCategories(user);
    }
    async addUser(userData) {
        return this.todoService.addUser(userData);
    }
    async addTodoList(todoListData, user) {
        return this.todoService.addTodoList(todoListData, user);
    }
    async addTodo(todoData) {
        return this.todoService.addTodo(todoData);
    }
    async addCategory(catData, user) {
        return this.todoService.addCategory(catData, user);
    }
    async updateTodo(id) {
        return this.todoService.updateTodo(id);
    }
    async deleteTodo(id) {
        return this.todoService.deleteTodo(id);
    }
    async deleteTodoList(id) {
        return this.todoService.deleteTodoList(id);
    }
    async updateUserRefreshToken(token, user) {
        return this.todoService.updateUserRefreshToken(token, user);
    }
};
exports.TodoResolver = TodoResolver;
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, graphql_1.Query)((returns) => String),
    __param(0, (0, currentuser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "currentUser", null);
__decorate([
    (0, graphql_1.Query)((returns) => [todo_model_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "allUsers", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, graphql_1.Query)((returns) => todo_model_1.User),
    __param(0, (0, currentuser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getUser", null);
__decorate([
    (0, graphql_1.Query)((returns) => String),
    __param(0, (0, currentuser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getRefreshToken", null);
__decorate([
    (0, graphql_1.Query)((returns) => [todo_model_1.TodoList]),
    __param(0, (0, currentuser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getTodoLists", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, graphql_1.Query)((returns) => [todo_model_1.TodoList]),
    __param(0, (0, graphql_1.Args)('args')),
    __param(1, (0, currentuser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todolist_input_1.TodoListPaginationInput, String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getTodoListsWithPagiantion", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, graphql_1.Query)((returns) => todo_model_1.TodoList),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getTodoList", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, graphql_1.Query)((returns) => [todo_model_1.Category]),
    __param(0, (0, currentuser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getUserCategories", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, graphql_1.Mutation)((returns) => todo_model_1.User),
    __param(0, (0, graphql_1.Args)('userData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.AddUserInput]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "addUser", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, graphql_1.Mutation)((returns) => todo_model_1.Todo),
    __param(0, (0, graphql_1.Args)('todoListData')),
    __param(1, (0, currentuser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todolist_input_1.TodoListInput, String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "addTodoList", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, graphql_1.Mutation)((returns) => todo_model_1.Todo),
    __param(0, (0, graphql_1.Args)('todoData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_input_1.TodoInput]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "addTodo", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, graphql_1.Mutation)((returns) => todo_model_1.Category),
    __param(0, (0, graphql_1.Args)('catData')),
    __param(1, (0, currentuser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cat_input_1.AddCategoryInput, String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "addCategory", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, graphql_1.Mutation)((returns) => todo_model_1.Todo),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "updateTodo", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, graphql_1.Mutation)((returns) => todo_model_1.Todo),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "deleteTodo", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, graphql_1.Mutation)((returns) => todo_model_1.TodoList),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "deleteTodoList", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => todo_model_1.User),
    __param(0, (0, graphql_1.Args)('token')),
    __param(1, (0, currentuser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "updateUserRefreshToken", null);
exports.TodoResolver = TodoResolver = __decorate([
    (0, graphql_1.Resolver)(),
    (0, roles_decorator_1.Roles)(['todo-access']),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoResolver);
//# sourceMappingURL=todo.resolver.js.map