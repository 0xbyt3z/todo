import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetUserInput } from './dto/user.input';

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
        Todo: true,
      },
    });

    console.log(res);

    return res;
  }

  async getTodoList(id: string) {
    const res = await this.prisma.todoList.findUnique({
      where: {
        id,
      },
      include: {
        Todo: true,
      },
    });

    console.log(res);

    return res;
  }
}
