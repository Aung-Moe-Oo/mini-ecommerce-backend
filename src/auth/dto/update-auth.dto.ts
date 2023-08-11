import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto, LoginDto } from './create-auth.dto';

export class UpdateRegisterDto extends PartialType(RegisterDto) {}
export class UpdateLoginDto extends PartialType(LoginDto) {}
