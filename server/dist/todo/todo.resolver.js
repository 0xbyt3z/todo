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
let TodoResolver = class TodoResolver {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async allUsers() {
        return this.todoService.allUsers();
    }
    async getUser(email) {
        return this.todoService.getUser(email);
    }
    async getTodoLists(email) {
        return this.todoService.getTodoLists(email);
    }
    async getTodoListsWithPagiantion(args) {
        return this.todoService.getTodoListsWithPagination(args);
    }
    async getTodoList(id) {
        return this.todoService.getTodoList(id);
    }
    async getUserCategories(email) {
        return this.todoService.getUserCategories(email);
    }
    async addUser(userData) {
        return this.todoService.addUser(userData);
    }
    async addTodoList(todoListData) {
        return this.todoService.addTodoList(todoListData);
    }
    async addTodo(todoData) {
        return this.todoService.addTodo(todoData);
    }
    async addCategory(catData) {
        return this.todoService.addCategory(catData);
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
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getUser", null);
__decorate([
    (0, graphql_1.Query)((returns) => [todo_model_1.TodoList]),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getTodoLists", null);
__decorate([
    (0, graphql_1.Query)((returns) => [todo_model_1.TodoList]),
    __param(0, (0, graphql_1.Args)('args')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todolist_input_1.TodoListPaginationInput]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getTodoListsWithPagiantion", null);
__decorate([
    (0, graphql_1.Query)((returns) => todo_model_1.TodoList),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getTodoList", null);
__decorate([
    (0, graphql_1.Query)((returns) => [todo_model_1.Category]),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getUserCategories", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => todo_model_1.User),
    __param(0, (0, graphql_1.Args)('userData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.AddUserInput]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "addUser", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => todo_model_1.Todo),
    __param(0, (0, graphql_1.Args)('todoListData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todolist_input_1.TodoListInput]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "addTodoList", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => todo_model_1.Todo),
    __param(0, (0, graphql_1.Args)('todoData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_input_1.TodoInput]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "addTodo", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => todo_model_1.Category),
    __param(0, (0, graphql_1.Args)('catData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cat_input_1.AddCategoryInput]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "addCategory", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => todo_model_1.Todo),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "updateTodo", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => todo_model_1.Todo),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "deleteTodo", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => todo_model_1.TodoList),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "deleteTodoList", null);
exports.TodoResolver = TodoResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoResolver);
//# sourceMappingURL=todo.resolver.js.map