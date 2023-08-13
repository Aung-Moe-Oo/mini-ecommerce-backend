import { AuthService } from './user.service';
import { LoginDto, RegisterDto } from './dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
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
