import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { Responser } from 'src/utils/responser';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const { name, email, password } = registerDto;
      const user = await this.prisma.admin.create({
        data: {
          name,
          email,
          password: await hash(password),
        },
      });
      return Responser({
        statusCode: 200,
        message: 'User registered',
        body: user,
        devMessage: 'user-registered',
      });
    } catch (err) {
      throw new HttpException(
        { devMessage: err, message: 'User cannot be registered' },
        401,
      );
    }
  }

  async login(dto: LoginDto) {
    try {
      const { email, password } = dto;
      const user = await this.prisma.admin.findFirst({
        where: {
          email,
        },
      });

      if (user) {
        const checkPassword = await verify(user.password, password);
        if (checkPassword) {
          const activeUser = await this.prisma.admin.update({
            where: {
              id: user.id,
            },
            data: {
              token: await this.jwtService.signAsync(
                { id: user.id },
                {
                  expiresIn: '1d',
                  secret: process.env.JWT_SECRET,
                },
              ),
            },
          });
          return Responser({
            statusCode: 200,
            message: 'User login success',
            body: { token: activeUser.token },
            devMessage: 'user-login-success',
          });
        } else {
          return Responser({
            statusCode: 401,
            message: 'User Wrong Password',
            body: null,
            devMessage: 'user-login-fail',
          });
        }
      }
      return Responser({
        statusCode: 404,
        message: 'User has not been registered yet.',
        body: null,
        devMessage: 'user-not-found',
      });
    } catch (err) {
      throw new HttpException(
        { devMessage: err, message: 'User cannot be logged in.' },
        401,
      );
    }
  }
}
