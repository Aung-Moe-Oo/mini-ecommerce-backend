import { Module } from '@nestjs/common';
import { AuthService } from './user.service';
import { AuthController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService],
})
export class UserModule {}
