import { PrismaService } from 'src/prisma.service';
import { AddUserInput } from './dto/user.input';
import { TodoInput } from './dto/todo.input';
import { TodoListInput, TodoListPaginationInput } from './dto/todolist.input';
import { AddCategoryInput } from './dto/cat.input';
export declare class TodoService {
    private prisma;
    constructor(prisma: PrismaService);
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
    getTodoListsWithPagination(args: TodoListPaginationInput): Promise<({
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
    addUser(data: AddUserInput): Promise<{
        id: string;
        email: string;
        created_at: Date;
    }>;
    addTodoList(data: TodoListInput): Promise<{
        id: string;
        uId: string;
        title: string;
        created_at: Date;
    }>;
    addTodo(data: TodoInput): Promise<{
        id: string;
        lId: string;
        title: string;
        remarks: string;
        completed: boolean;
        deadline: Date;
        category: string;
        created_at: Date;
    }>;
    addCategory(data: AddCategoryInput): Promise<{
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
}
