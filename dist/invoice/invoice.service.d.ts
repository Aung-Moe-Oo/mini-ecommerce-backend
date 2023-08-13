import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma.service';
import { IUser } from 'src/utils/Iuser';
export declare class InvoiceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateInvoiceDto, req: IUser): Promise<{
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
    findOne(id: number): string;
    update(id: number, updateInvoiceDto: UpdateInvoiceDto): string;
    remove(id: number): string;
}
