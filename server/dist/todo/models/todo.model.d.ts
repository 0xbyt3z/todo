export declare class User {
    id: string;
    name: string;
    created_at: Date;
    TodoList: TodoList[];
}
export declare class TodoList {
    id: string;
    uId: string;
    title: string;
    created_at: Date;
    Todo: Todo[];
}
export declare class Todo {
    id: string;
    lId: string;
    title: string;
    remarks: string;
    completed: boolean;
    category: string;
    deadline: Date;
    created_at: Date;
}
