import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNotEmpty, ValidateNested } from 'class-validator';
export class CreateInvoiceDto {
  @ApiProperty()
  @IsNotEmpty()
  status: 'UNPAID' | 'PAID' | 'CANCELED';

  @ApiProperty({ type: () => OrderProductDto })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  products: OrderProductDto[];
}

class OrderProductDto {
  @ApiProperty()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;
}
