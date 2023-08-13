import { LoginDto, RegisterDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        meta: {
            success: boolean;
            message: string;
            devMessage: string;
        };
        body: any;
    }>;
    login(dto: LoginDto): Promise<{
        meta: {
            success: boolean;
            message: string;
            devMessage: string;
        };
        body: any;
    }>;
}
