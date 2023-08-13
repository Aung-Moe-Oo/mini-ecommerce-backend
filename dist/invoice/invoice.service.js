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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const responser_1 = require("../utils/responser");
const prisma_service_1 = require("../prisma.service");
let InvoiceService = exports.InvoiceService = class InvoiceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, req) {
        try {
            const { status } = dto;
            let order = null;
            let totalPrices = [];
            const invoice = await this.prisma.invoice.create({
                data: {
                    status,
                    total: 0,
                },
            });
            for (const product of dto.products) {
                const foundProduct = await this.prisma.product.findFirst({
                    where: {
                        id: product.productId,
                    },
                });
                order = await this.prisma.order.create({
                    data: {
                        OrderedBy: {
                            connect: {
                                id: req.user.id,
                            },
                        },
                        quantity: product.quantity,
                        rate: foundProduct.price,
                        totalPrice: foundProduct.price * product.quantity,
                        Product: {
                            connect: {
                                id: product.productId,
                            },
                        },
                        Invoice: {
                            connect: {
                                id: invoice.id,
                            },
                        },
                    },
                });
                totalPrices.push(order.totalPrice);
            }
            const NewInvoice = await this.prisma.invoice.update({
                where: { id: invoice.id },
                data: {
                    status,
                    total: (await totalPrices.reduce((a, b) => a + b)) || 0,
                },
            });
            return (0, responser_1.Responser)({
                statusCode: 200,
                message: 'Invoice created',
                body: NewInvoice,
                devMessage: 'invoice-created',
            });
        }
        catch (err) {
            throw new common_1.HttpException({ devMessage: err, message: 'Invoice cannot be created' }, 401);
        }
    }
    findAll() {
        return this.prisma.invoice.findMany({
            include: {
                Order: true,
            },
        });
    }
    findOne(id) {
        return `This action returns a #${id} invoice`;
    }
    update(id, updateInvoiceDto) {
        return `This action updates a #${id} invoice`;
    }
    remove(id) {
        return `This action removes a #${id} invoice`;
    }
};
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map