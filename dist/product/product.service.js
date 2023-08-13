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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const responser_1 = require("../utils/responser");
let ProductService = exports.ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto, images, req) {
        const { title, desc, price } = createProductDto;
        try {
            const createdProduct = await this.prisma.product.create({
                data: {
                    title,
                    desc,
                    price: +price,
                    CreatedBy: {
                        connect: {
                            id: req.admin.id,
                        },
                    },
                },
            });
            images.map(async (file) => {
                await this.prisma.photo.create({
                    data: {
                        name: file.filename,
                        link: process.env.NODE_ENV === 'development'
                            ? `http://localhost:8001/api/file/${file.path}`
                            : `https://mini-ecommerce-backend.vercel.app/api/file/${file.path}`,
                        Product: {
                            connect: {
                                id: createdProduct.id,
                            },
                        },
                    },
                });
            });
            return (0, responser_1.Responser)({
                statusCode: 200,
                message: 'Product created',
                body: createdProduct,
                devMessage: 'products-created',
            });
        }
        catch (err) {
            throw new common_1.HttpException({ devMessage: err, message: 'Product cannot be created' }, 401);
        }
    }
    async getAll() {
        try {
            const createdProduct = await this.prisma.product.findMany({
                include: {
                    CreatedBy: {
                        select: {
                            name: true,
                        },
                    },
                    Photo: true,
                },
            });
            return (0, responser_1.Responser)({
                statusCode: 200,
                message: 'Products found',
                body: createdProduct,
                devMessage: 'products-found',
            });
        }
        catch (err) {
            throw new common_1.HttpException({ devMessage: err, message: 'Product cannot be found' }, 404);
        }
    }
};
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map