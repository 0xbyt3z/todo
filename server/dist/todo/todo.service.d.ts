import { PrismaService } from 'src/prisma.service';
export declare class TodoService {
    private prisma;
    constructor(prisma: PrismaService);
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
}
