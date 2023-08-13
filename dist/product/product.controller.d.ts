/// <reference types="multer" />
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { IUser } from 'src/utils/Iuser';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(images: Array<Express.Multer.File>, dto: CreateProductDto, req: IUser): Promise<{
        meta: {
            success: boolean;
            message: string;
            devMessage: string;
        };
        body: any;
    }>;
    get(): Promise<{
        meta: {
            success: boolean;
            message: string;
            devMessage: string;
        };
        body: any;
    }>;
}
