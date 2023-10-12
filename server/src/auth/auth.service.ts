import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(readonly prisma: PrismaService) {}
  async findUser(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
