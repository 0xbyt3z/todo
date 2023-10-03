import { TodoService } from './todo.service';
import { TodoInput } from './dto/todo.input';
import { TodoListInput } from './dto/todolist.input';
export declare class TodoResolver {
    private readonly todoService;
    constructor(todoService: TodoService);
    allUsers(): Promise<{
        id: string;
        name: string;
        created_at: Date;
    }[]>;
    getUser(id: string): Promise<{
        id: string;
        name: string;
        created_at: Date;
    }>;
    getTodoLists(uId: string): Promise<({
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
    addUser(id: string): Promise<any[]>;
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
}
