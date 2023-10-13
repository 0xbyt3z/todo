import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { PrismaService } from 'src/prisma.service';
import { TodoController } from './todo.controller';
import { JwtService } from '@nestjs/jwt';
import { OidcService } from 'src/auth/oidc/oidc.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [HttpModule],
  providers: [
    TodoResolver,
    TodoService,
    PrismaService,
    JwtService,
    OidcService,
    ConfigService,
    AuthService,
  ],
  controllers: [TodoController],
})
export class TodoModule {}
