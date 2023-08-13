import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma.service';
import Responser from 'src/utils/responser';
import { IUser } from 'src/utils/Iuser';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createProductDto: CreateProductDto,
    images: Array<Express.Multer.File>,
    req: IUser,
  ) {
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
            link:
              process.env.NODE_ENV === 'development'
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

      return Responser({
        statusCode: 200,
        message: 'Product created',
        body: createdProduct,
        devMessage: 'products-created',
      });
    } catch (err) {
      throw new HttpException(
        { devMessage: err, message: 'Product cannot be created' },
        401,
      );
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

      return Responser({
        statusCode: 200,
        message: 'Products found',
        body: createdProduct,
        devMessage: 'products-found',
      });
    } catch (err) {
      throw new HttpException(
        { devMessage: err, message: 'Product cannot be found' },
        404,
      );
    }
  }
}
