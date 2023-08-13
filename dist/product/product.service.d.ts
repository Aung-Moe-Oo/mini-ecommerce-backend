/// <reference types="multer" />
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma.service';
import { IUser } from 'src/utils/Iuser';
export declare class ProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto, images: Array<Express.Multer.File>, req: IUser): Promise<{
        meta: {
            success: boolean;
            message: string;
            devMessage: string;
        };
        body: any;
    }>;
    getAll(): Promise<{
        meta: {
            success: boolean;
            message: string;
            devMessage: string;
        };
        body: any;
    }>;
}
