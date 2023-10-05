import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddUserInput, GetUserInput } from './dto/user.input';
import { TodoInput } from './dto/todo.input';
import { TodoListInput } from './dto/todolist.input';
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

  async addTodoList(data: TodoListInput) {
    return await this.prisma.todoList.create({
      data: {
        title: data.title,
        user: { connect: { email: data.email } },
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
      },
    });
  }

  async addCategory(data: AddCategoryInput) {
    return await this.prisma.usercategories.create({
      data: {
        email: data.email,
        name: data.name,
        color: data.color,
      },
    });
  }
}
