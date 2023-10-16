import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category, Todo, TodoList, User } from './models/todo.model';
import { TodoService } from './todo.service';
import { AddUserInput, GetUserInput } from './dto/user.input';
import { TodoInput } from './dto/todo.input';
import { TodoListInput, TodoListPaginationInput } from './dto/todolist.input';
import { AddCategoryInput } from './dto/cat.input';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorator/currentuser.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Resolver()
@Roles(['todo-access'])
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(RoleGuard)
  //setmetadata can be used to set custom metadata for individul routes
  //but reflector decorator can be used to metadata globally
  @Query((returns) => String)
  async currentUser(@CurrentUser() user: any) {
    return user;
  }

  @Query((returns) => [User])
  async allUsers() {
    return this.todoService.allUsers();
  }

  @UseGuards(RoleGuard)
  // @SetMetadata('roles', 'manage-account')
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

  @UseGuards(RoleGuard)
  @Query((returns) => [TodoList])
  async getTodoListsWithPagiantion(
    @Args('args') args: TodoListPaginationInput,
    @CurrentUser() user: string,
  ) {
    return this.todoService.getTodoListsWithPagination(args, user);
  }

  @UseGuards(RoleGuard)
  @Query((returns) => TodoList)
  async getTodoList(@Args('id') id: string) {
    return this.todoService.getTodoList(id);
  }

  @UseGuards(RoleGuard)
  @Query((returns) => [Category])
  async getUserCategories(@CurrentUser() user: string) {
    return this.todoService.getUserCategories(user);
  }

  @UseGuards(RoleGuard)
  @Mutation((returns) => User)
  async addUser(@Args('userData') userData: AddUserInput) {
    return this.todoService.addUser(userData);
  }

  @UseGuards(RoleGuard)
  @Mutation((returns) => Todo)
  async addTodoList(
    @Args('todoListData') todoListData: TodoListInput,
    @CurrentUser() user: string,
  ) {
    return this.todoService.addTodoList(todoListData, user);
  }

  @UseGuards(RoleGuard)
  @Mutation((returns) => Todo)
  async addTodo(@Args('todoData') todoData: TodoInput) {
    return this.todoService.addTodo(todoData);
  }

  @UseGuards(RoleGuard)
  @Mutation((returns) => Category)
  async addCategory(
    @Args('catData') catData: AddCategoryInput,
    @CurrentUser() user: string,
  ) {
    return this.todoService.addCategory(catData, user);
  }

  @UseGuards(RoleGuard)
  @Mutation((returns) => Todo)
  async updateTodo(@Args('id') id: string) {
    return this.todoService.updateTodo(id);
  }

  @UseGuards(RoleGuard)
  @Mutation((returns) => Todo)
  async deleteTodo(@Args('id') id: string) {
    return this.todoService.deleteTodo(id);
  }

  @UseGuards(RoleGuard)
  @Mutation((returns) => TodoList)
  async deleteTodoList(@Args('id') id: string) {
    return this.todoService.deleteTodoList(id);
  }

  //do not add the guard for this too
  //called from the server when the refresh token is expired
  @Mutation((returns) => User)
  async updateUserRefreshToken(
    @Args('token') token: string,
    @CurrentUser() user: string,
  ) {
    return this.todoService.updateUserRefreshToken(token, user);
  }
}
