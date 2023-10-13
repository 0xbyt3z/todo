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
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TodoService = class TodoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async allUsers() {
        return await this.prisma.user.findMany();
    }
    async getUser(email) {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
    async getRefreshToken(email) {
        if (email == '') {
            return '';
        }
        const res = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        console.log(res.refreshToken);
        return res.refreshToken;
    }
    async getTodoLists(email) {
        return await this.prisma.todoList.findMany({
            where: {
                user: { email },
            },
            include: {
                Todo: { orderBy: { created_at: 'asc' } },
            },
            orderBy: {
                created_at: 'desc',
            },
        });
    }
    async getTodoListsWithPagination(args, user) {
        return await this.prisma.todoList.findMany({
            where: {
                user: { email: user },
            },
            include: {
                Todo: { orderBy: { created_at: 'asc' } },
            },
            take: args.first,
            skip: args.skip,
            orderBy: {
                created_at: 'desc',
            },
        });
    }
    async getTodoList(id) {
        return await this.prisma.todoList.findUnique({
            where: {
                id,
            },
            include: {
                Todo: true,
            },
        });
    }
    async getUserCategories(email) {
        return await this.prisma.usercategories.findMany({
            where: {
                email,
            },
        });
    }
    async addUser(data) {
        return await this.prisma.user.create({
            data: {
                email: data.email,
            },
        });
    }
    async addTodoList(data, user) {
        return await this.prisma.todoList.create({
            data: {
                title: data.title,
                user: { connect: { email: user } },
            },
        });
    }
    async addTodo(data) {
        return await this.prisma.todo.create({
            data: {
                deadline: data.deadline,
                completed: data.completed,
                title: data.title,
                lId: data.lId,
                category: data.category,
                remarks: data.remarks,
            },
        });
    }
    async addCategory(data, user) {
        return await this.prisma.usercategories.create({
            data: {
                email: user,
                name: data.name,
                color: data.color,
            },
        });
    }
    async updateTodo(id) {
        const ischecked = (await this.prisma.todo.findFirst({ where: { id } }))
            .completed;
        return await this.prisma.todo.update({
            where: { id },
            data: {
                completed: !ischecked,
            },
        });
    }
    async deleteTodo(id) {
        return await this.prisma.todo.delete({
            where: { id },
        });
    }
    async deleteTodoList(id) {
        return await this.prisma.todoList.delete({
            where: { id },
        });
    }
    async updateUserRefreshToken(token, user) {
        console.log(user);
        return await this.prisma.user.upsert({
            where: { email: user },
            update: {
                refreshToken: token,
            },
            create: {
                email: user,
                isBanned: false,
                refreshToken: token,
            },
        });
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TodoService);
//# sourceMappingURL=todo.service.js.map