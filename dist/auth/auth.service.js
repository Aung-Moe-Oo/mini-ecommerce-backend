"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon2_1 = require("argon2");
const prisma_service_1 = require("../prisma.service");
const responser_1 = require("../utils/responser");
const jwt_1 = require("@nestjs/jwt");
let AuthService = exports.AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        try {
            const { name, email, password } = registerDto;
            const user = await this.prisma.admin.create({
                data: {
                    name,
                    email,
                    password: await (0, argon2_1.hash)(password),
                },
            });
            return (0, responser_1.Responser)({
                statusCode: 200,
                message: 'User registered',
                body: user,
                devMessage: 'user-registered',
            });
        }
        catch (err) {
            throw new common_1.HttpException({ devMessage: err, message: 'User cannot be registered' }, 401);
        }
    }
    async login(dto) {
        try {
            const { email, password } = dto;
            const user = await this.prisma.admin.findFirst({
                where: {
                    email,
                },
            });
            if (user) {
                const checkPassword = await (0, argon2_1.verify)(user.password, password);
                if (checkPassword) {
                    const activeUser = await this.prisma.admin.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            token: await this.jwtService.signAsync({ id: user.id }, {
                                expiresIn: '1d',
                                secret: process.env.JWT_SECRET,
                            }),
                        },
                    });
                    return (0, responser_1.Responser)({
                        statusCode: 200,
                        message: 'User login success',
                        body: { token: activeUser.token },
                        devMessage: 'user-login-success',
                    });
                }
                else {
                    return (0, responser_1.Responser)({
                        statusCode: 401,
                        message: 'User Wrong Password',
                        body: null,
                        devMessage: 'user-login-fail',
                    });
                }
            }
            return (0, responser_1.Responser)({
                statusCode: 404,
                message: 'User has not been registered yet.',
                body: null,
                devMessage: 'user-not-found',
            });
        }
        catch (err) {
            throw new common_1.HttpException({ devMessage: err, message: 'User cannot be logged in.' }, 401);
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map