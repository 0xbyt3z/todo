import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category, Todo, TodoList, User } from './models/todo.model';
import { TodoService } from './todo.service';
import { AddUserInput, GetUserInput } from './dto/user.input';
import { TodoInput } from './dto/todo.input';
import { TodoListInput, TodoListPaginationInput } from './dto/todolist.input';
import { AddCategoryInput } from './dto/cat.input';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query((returns) => [User])
  async allUsers() {
    return this.todoService.allUsers();
  }

  @Query((returns) => User)
  async getUser(@Args('email') email: string) {
    return this.todoService.getUser(email);
  }

  @Query((returns) => [TodoList])
  async getTodoLists(@Args('email') email: string) {
    return this.todoService.getTodoLists(email);
  }

  @Query((returns) => [TodoList])
  async getTodoListsWithPagiantion(
    @Args('args') args: TodoListPaginationInput,
  ) {
    return this.todoService.getTodoListsWithPagination(args);
  }

  @Query((returns) => TodoList)
  async getTodoList(@Args('id') id: string) {
    return this.todoService.getTodoList(id);
  }

  @Query((returns) => [Category])
  async getUserCategories(@Args('email') email: string) {
    return this.todoService.getUserCategories(email);
  }

  @Mutation((returns) => User)
  async addUser(@Args('userData') userData: AddUserInput) {
    return this.todoService.addUser(userData);
  }

  @Mutation((returns) => Todo)
  async addTodoList(@Args('todoListData') todoListData: TodoListInput) {
    return this.todoService.addTodoList(todoListData);
  }

  @Mutation((returns) => Todo)
  async addTodo(@Args('todoData') todoData: TodoInput) {
    return this.todoService.addTodo(todoData);
  }

  @Mutation((returns) => Category)
  async addCategory(@Args('catData') catData: AddCategoryInput) {
    return this.todoService.addCategory(catData);
  }
}
