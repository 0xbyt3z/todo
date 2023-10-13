import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category, Todo, TodoList, User } from './models/todo.model';
import { TodoService } from './todo.service';
import { AddUserInput, GetUserInput } from './dto/user.input';
import { TodoInput } from './dto/todo.input';
import { TodoListInput, TodoListPaginationInput } from './dto/todolist.input';
import { AddCategoryInput } from './dto/cat.input';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorator/currentuser.decorator';
import { RoleGuard } from 'src/auth/role.guard';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(RoleGuard)
  @Query((returns) => String)
  async currentUser(@CurrentUser() user: any) {
    return user;
  }

  @Query((returns) => [User])
  async allUsers() {
    return this.todoService.allUsers();
  }

  @UseGuards(RoleGuard)
  @Query((returns) => User)
  async getUser(@CurrentUser() email: string) {
    return this.todoService.getUser(email);
  }

  //do not add guard to this
  //having the guards prevents getting refreshToken when the JWT is expired
  @Query((returns) => String)
  async getRefreshToken(@CurrentUser() email: string) {
    return this.todoService.getRefreshToken(email);
  }

  @Query((returns) => [TodoList])
  async getTodoLists(@CurrentUser() user: string) {
    return this.todoService.getTodoLists(user);
  }

  @Query((returns) => [TodoList])
  async getTodoListsWithPagiantion(
    @Args('args') args: TodoListPaginationInput,
    @CurrentUser() user: string,
  ) {
    return this.todoService.getTodoListsWithPagination(args, user);
  }

  @Query((returns) => TodoList)
  async getTodoList(@Args('id') id: string) {
    return this.todoService.getTodoList(id);
  }

  @Query((returns) => [Category])
  async getUserCategories(@CurrentUser() user: string) {
    return this.todoService.getUserCategories(user);
  }

  @Mutation((returns) => User)
  async addUser(@Args('userData') userData: AddUserInput) {
    return this.todoService.addUser(userData);
  }

  @Mutation((returns) => Todo)
  async addTodoList(
    @Args('todoListData') todoListData: TodoListInput,
    @CurrentUser() user: string,
  ) {
    return this.todoService.addTodoList(todoListData, user);
  }

  @Mutation((returns) => Todo)
  async addTodo(@Args('todoData') todoData: TodoInput) {
    return this.todoService.addTodo(todoData);
  }

  @Mutation((returns) => Category)
  async addCategory(
    @Args('catData') catData: AddCategoryInput,
    @CurrentUser() user: string,
  ) {
    return this.todoService.addCategory(catData, user);
  }

  @Mutation((returns) => Todo)
  async updateTodo(@Args('id') id: string) {
    return this.todoService.updateTodo(id);
  }

  @Mutation((returns) => Todo)
  async deleteTodo(@Args('id') id: string) {
    return this.todoService.deleteTodo(id);
  }

  @Mutation((returns) => TodoList)
  async deleteTodoList(@Args('id') id: string) {
    return this.todoService.deleteTodoList(id);
  }

  @Mutation((returns) => User)
  async updateUserRefreshToken(
    @Args('token') token: string,
    @CurrentUser() user: string,
  ) {
    return this.todoService.updateUserRefreshToken(token, user);
  }
}
