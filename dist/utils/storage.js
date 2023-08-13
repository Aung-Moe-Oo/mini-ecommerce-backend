"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSizeValidationPipe = exports.fileStorage = exports.handleDelete = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const node_fs_1 = require("node:fs");
const client_1 = require("@prisma/client");
const handleDelete = async ({ link, id }) => {
    const prisma = new client_1.PrismaClient();
    console.log(link, id);
    console.log(link.split('uploads')[1]);
    (0, node_fs_1.unlink)(__dirname + '../../../../uploads/' + link.split('uploads')[1], (err) => {
        if (err)
            throw err;
    });
    return await prisma.photo.delete({
        where: {
            id: id,
        },
    });
};
exports.handleDelete = handleDelete;
exports.fileStorage = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads',
        filename: (req, file, cb) => {
            const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            return cb(null, `${randomName}${file.originalname}`);
        },
    }),
};
let FileSizeValidationPipe = exports.FileSizeValidationPipe = class FileSizeValidationPipe {
    transform(value) {
        if (value) {
            if (value.size > 10 * 1024 * 1024) {
                throw new common_1.HttpException({
                    devMessage: 'file-size-exceed',
                    message: 'File cannot be uploaded',
                }, 404);
            }
            else {
                return value;
            }
        }
    }
};
exports.FileSizeValidationPipe = FileSizeValidationPipe = __decorate([
    (0, common_1.Injectable)()
], FileSizeValidationPipe);
//# sourceMappingURL=storage.js.map