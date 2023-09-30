import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [TodoResolver, TodoService, PrismaService],
})
export class TodoModule {}
