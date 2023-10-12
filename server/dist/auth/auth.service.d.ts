import { PrismaService } from 'src/prisma.service';
export declare class AuthService {
    readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findUser(email: string): Promise<{
        id: string;
        email: string;
        created_at: Date;
    }>;
}
