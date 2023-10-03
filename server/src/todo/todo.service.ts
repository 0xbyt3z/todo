import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetUserInput } from './dto/user.input';
import { TodoInput } from './dto/todo.input';
import { TodoListInput } from './dto/todolist.input';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  async allUsers() {
    return await this.prisma.user.findMany();
  }

  async getUser(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getTodoLists(uId: string) {
    const res = await this.prisma.todoList.findMany({
      where: {
        uId: uId,
      },
      include: {
        Todo: { orderBy: { created_at: 'asc' } },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    console.log(res);

    return res;
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

  async addTodoList(data: TodoListInput) {
    return await this.prisma.todoList.create({
      data: {
        title: data.title,
        uId: data.uId,
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
      },
    });
  }
}
