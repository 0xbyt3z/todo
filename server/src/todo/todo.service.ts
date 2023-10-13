import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddUserInput, GetUserInput } from './dto/user.input';
import { TodoInput } from './dto/todo.input';
import { TodoListInput, TodoListPaginationInput } from './dto/todolist.input';
import { AddCategoryInput } from './dto/cat.input';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  async allUsers() {
    return await this.prisma.user.findMany();
  }

  async getUser(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getRefreshToken(email: string) {
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

  async getTodoLists(email: string) {
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

  async getTodoListsWithPagination(
    args: TodoListPaginationInput,
    user: string,
  ) {
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

  async getTodoList(id: string) {
    return await this.prisma.todoList.findUnique({
      where: {
        id,
      },
      include: {
        Todo: true,
      },
    });
  }

  async getUserCategories(email: string) {
    return await this.prisma.usercategories.findMany({
      where: {
        email,
      },
    });
  }

  async addUser(data: AddUserInput) {
    return await this.prisma.user.create({
      data: {
        email: data.email,
      },
    });
  }

  async addTodoList(data: TodoListInput, user: string) {
    return await this.prisma.todoList.create({
      data: {
        title: data.title,
        user: { connect: { email: user } },
      },
    });
  }

  async addTodo(data: TodoInput) {
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

  async addCategory(data: AddCategoryInput, user: string) {
    return await this.prisma.usercategories.create({
      data: {
        email: user,
        name: data.name,
        color: data.color,
      },
    });
  }

  async updateTodo(id: string) {
    const ischecked = (await this.prisma.todo.findFirst({ where: { id } }))
      .completed;
    return await this.prisma.todo.update({
      where: { id },
      data: {
        completed: !ischecked,
      },
    });
  }

  async deleteTodo(id: string) {
    return await this.prisma.todo.delete({
      where: { id },
    });
  }

  async deleteTodoList(id: string) {
    return await this.prisma.todoList.delete({
      where: { id },
    });
  }

  async updateUserRefreshToken(token: string, user: string) {
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
}
