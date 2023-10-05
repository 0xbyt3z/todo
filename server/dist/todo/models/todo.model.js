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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.Todo = exports.TodoList = exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
let User = class User {
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [TodoList]),
    __metadata("design:type", Array)
], User.prototype, "TodoList", void 0);
exports.User = User = __decorate([
    (0, graphql_1.ObjectType)()
], User);
let TodoList = class TodoList {
};
exports.TodoList = TodoList;
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.ID),
    __metadata("design:type", String)
], TodoList.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TodoList.prototype, "uId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TodoList.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], TodoList.prototype, "created_at", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [Todo]),
    __metadata("design:type", Array)
], TodoList.prototype, "Todo", void 0);
exports.TodoList = TodoList = __decorate([
    (0, graphql_1.ObjectType)()
], TodoList);
let Todo = class Todo {
};
exports.Todo = Todo;
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.ID),
    __metadata("design:type", String)
], Todo.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Todo.prototype, "lId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Todo.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Todo.prototype, "remarks", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Todo.prototype, "completed", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Todo.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Todo.prototype, "deadline", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Todo.prototype, "created_at", void 0);
exports.Todo = Todo = __decorate([
    (0, graphql_1.ObjectType)()
], Todo);
let Category = class Category {
};
exports.Category = Category;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Category.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Category.prototype, "color", void 0);
exports.Category = Category = __decorate([
    (0, graphql_1.ObjectType)()
], Category);
//# sourceMappingURL=todo.model.js.map