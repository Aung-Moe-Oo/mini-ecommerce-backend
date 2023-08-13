export declare class CreateInvoiceDto {
    status: 'UNPAID' | 'PAID' | 'CANCELED';
    products: OrderProductDto[];
}
declare class OrderProductDto {
    productId: string;
    quantity: number;
}
export {};
