import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { IUser } from 'src/utils/Iuser';
export declare class InvoiceController {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    create(createInvoiceDto: CreateInvoiceDto, req: IUser): Promise<{
        meta: {
            success: boolean;
            message: string;
            devMessage: string;
        };
        body: any;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        Order: {
            id: string;
            orderedById: string;
            invoiceId: string;
            quantity: number;
            rate: number;
            totalPrice: number;
        }[];
    } & {
        id: string;
        total: number;
        status: import(".prisma/client").$Enums.InoviceStatus;
    })[]>;
    findOne(id: string): string;
    update(id: string, updateInvoiceDto: UpdateInvoiceDto): string;
    remove(id: string): string;
}
