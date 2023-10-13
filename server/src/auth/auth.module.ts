import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { OidcService } from './oidc/oidc.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [HttpModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [OidcService, ConfigService, AuthService, PrismaService],
})
export class AuthModule {}
