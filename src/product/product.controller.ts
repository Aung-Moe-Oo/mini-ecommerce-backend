import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe, fileStorage } from '../utils/storage';
import { AdminAuthGuard } from 'src/auth/auth.guard';
import { IUser } from 'src/utils/Iuser';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('products')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Create Product' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Product Create',
    type: CreateProductDto,
  })
  @UseInterceptors(FilesInterceptor('images', 10, fileStorage))
  async create(
    @UploadedFiles(new FileSizeValidationPipe())
    images: Array<Express.Multer.File>,
    @Body() dto: CreateProductDto,
    @Request() req: IUser,
  ) {
    return this.productService.create(dto, images, req);
  }

  @Get('')
  @ApiOperation({ summary: 'Get Product List' })
  async get() {
    return this.productService.getAll();
  }
}
