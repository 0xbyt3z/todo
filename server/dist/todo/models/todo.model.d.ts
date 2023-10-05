export declare class User {
    id: string;
    email: string;
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
export declare class Category {
    id: string;
    email: string;
    name: string;
    color: string;
}
