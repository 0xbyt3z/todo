import { TodoService } from './todo.service';
import { AddUserInput } from './dto/user.input';
import { TodoInput } from './dto/todo.input';
import { TodoListInput } from './dto/todolist.input';
import { AddCategoryInput } from './dto/cat.input';
export declare class TodoResolver {
    private readonly todoService;
    constructor(todoService: TodoService);
    allUsers(): Promise<{
        id: string;
        email: string;
        created_at: Date;
    }[]>;
    getUser(email: string): Promise<{
        id: string;
        email: string;
        created_at: Date;
    }>;
    getTodoLists(email: string): Promise<({
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
    getUserCategories(email: string): Promise<{
        id: string;
        email: string;
        name: string;
        color: string;
    }[]>;
    addUser(userData: AddUserInput): Promise<{
        id: string;
        email: string;
        created_at: Date;
    }>;
    addTodoList(todoListData: TodoListInput): Promise<{
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
    addCategory(catData: AddCategoryInput): Promise<{
        id: string;
        email: string;
        name: string;
        color: string;
    }>;
}
