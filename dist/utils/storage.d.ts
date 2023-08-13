/// <reference types="multer" />
import { PipeTransform } from '@nestjs/common';
interface IHandleDelete {
    link: string;
    id: string;
}
export declare const handleDelete: ({ link, id }: IHandleDelete) => Promise<{
    id: string;
    name: string;
    link: string;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}>;
export declare const fileStorage: {
    storage: import("multer").StorageEngine;
};
export declare class FileSizeValidationPipe implements PipeTransform {
    transform(value: any): any;
}
export {};
