import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(readonly todoService: TodoService) {}

  @Get()
  fun(@Request() req) {
    console.log(req.headers);
    return 'This route is protected';
  }
}
