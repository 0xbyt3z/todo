import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo, TodoList, User } from './models/todo.model';
import { TodoService } from './todo.service';
import { GetUserInput } from './dto/user.input';
import { todoInput } from './dto/todo.input';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query((returns) => [User])
  async allUsers() {
    return this.todoService.allUsers();
  }

  @Query((returns) => User)
  async getUser(@Args('id') id: string) {
    return this.todoService.getUser(id);
  }

  @Query((returns) => [TodoList])
  async getTodoLists(@Args('uId') uId: string) {
    return this.todoService.getTodoLists(uId);
  }

  @Query((returns) => TodoList)
  async getTodoList(@Args('id') id: string) {
    return this.todoService.getTodoList(id);
  }

  @Mutation((returns) => User)
  async addUser(@Args('id') id: string) {
    return [];
  }

  @Mutation((returns) => Todo)
  async addTodo(@Args('todoData') todoData: todoInput) {
    return this.todoService.addTodo(todoData);
  }
}
