import { HttpException, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Responser } from 'src/utils/responser';
import { PrismaService } from 'src/prisma.service';
import { IUser } from 'src/utils/Iuser';

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateInvoiceDto, req: IUser) {
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

      return Responser({
        statusCode: 200,
        message: 'Invoice created',
        body: NewInvoice,
        devMessage: 'invoice-created',
      });
    } catch (err) {
      throw new HttpException(
        { devMessage: err, message: 'Invoice cannot be created' },
        401,
      );
    }
  }

  findAll() {
    return this.prisma.invoice.findMany({
      include: {
        Order: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
