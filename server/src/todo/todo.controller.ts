import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('todo')
export class TodoController {
  constructor(readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  fun(@Request() req) {
    console.log(req.headers);
    return 'This route is protected';
  }
}
