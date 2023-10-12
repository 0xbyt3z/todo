import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { PrismaService } from 'src/prisma.service';
import { TodoController } from './todo.controller';

@Module({
  providers: [TodoResolver, TodoService, PrismaService],
  controllers: [TodoController],
})
export class TodoModule {}
