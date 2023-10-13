import { TodoService } from './todo.service';
import { AddUserInput } from './dto/user.input';
import { TodoInput } from './dto/todo.input';
import { TodoListInput, TodoListPaginationInput } from './dto/todolist.input';
import { AddCategoryInput } from './dto/cat.input';
export declare class TodoResolver {
    private readonly todoService;
    constructor(todoService: TodoService);
    currentUser(user: any): Promise<any>;
    allUsers(): Promise<{
        id: string;
        email: string;
        isBanned: boolean;
        created_at: Date;
        refreshToken: string;
    }[]>;
    getUser(email: string): Promise<{
        id: string;
        email: string;
        isBanned: boolean;
        created_at: Date;
        refreshToken: string;
    }>;
    getRefreshToken(email: string): Promise<string>;
    getTodoLists(user: string): Promise<({
        Todo: {
            id: string;
            lId: string;
            title: string;
            remarks: string;
            completed: boolean;
            deadline: Date;
            category: string;
            created_at: Date;
        }[];
    } & {
        id: string;
        uId: string;
        title: string;
        created_at: Date;
    })[]>;
    getTodoListsWithPagiantion(args: TodoListPaginationInput, user: string): Promise<({
        Todo: {
            id: string;
            lId: string;
            title: string;
            remarks: string;
            completed: boolean;
            deadline: Date;
            category: string;
            created_at: Date;
        }[];
    } & {
        id: string;
        uId: string;
        title: string;
        created_at: Date;
    })[]>;
    getTodoList(id: string): Promise<{
        Todo: {
            id: string;
            lId: string;
            title: string;
            remarks: string;
            completed: boolean;
            deadline: Date;
            category: string;
            created_at: Date;
        }[];
    } & {
        id: string;
        uId: string;
        title: string;
        created_at: Date;
    }>;
    getUserCategories(user: string): Promise<{
        id: string;
        email: string;
        name: string;
        color: string;
    }[]>;
    addUser(userData: AddUserInput): Promise<{
        id: string;
        email: string;
        isBanned: boolean;
        created_at: Date;
        refreshToken: string;
    }>;
    addTodoList(todoListData: TodoListInput, user: string): Promise<{
        id: string;
        uId: string;
        title: string;
        created_at: Date;
    }>;
    addTodo(todoData: TodoInput): Promise<{
        id: string;
        lId: string;
        title: string;
        remarks: string;
        completed: boolean;
        deadline: Date;
        category: string;
        created_at: Date;
    }>;
    addCategory(catData: AddCategoryInput, user: string): Promise<{
        id: string;
        email: string;
        name: string;
        color: string;
    }>;
    updateTodo(id: string): Promise<{
        id: string;
        lId: string;
        title: string;
        remarks: string;
        completed: boolean;
        deadline: Date;
        category: string;
        created_at: Date;
    }>;
    deleteTodo(id: string): Promise<{
        id: string;
        lId: string;
        title: string;
        remarks: string;
        completed: boolean;
        deadline: Date;
        category: string;
        created_at: Date;
    }>;
    deleteTodoList(id: string): Promise<{
        id: string;
        uId: string;
        title: string;
        created_at: Date;
    }>;
    updateUserRefreshToken(token: string, user: string): Promise<{
        id: string;
        email: string;
        isBanned: boolean;
        created_at: Date;
        refreshToken: string;
    }>;
}
