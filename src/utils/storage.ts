import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { unlink } from 'node:fs';
import { PrismaClient } from '@prisma/client';

interface IHandleDelete {
  link: string;
  id: string;
}

export const handleDelete = async ({ link, id }: IHandleDelete) => {
  const prisma = new PrismaClient();
  console.log(link, id);
  console.log(link.split('uploads')[1]);
  unlink(
    __dirname + '../../../../uploads/' + link.split('uploads')[1],
    (err) => {
      if (err) throw err;
    },
  );

  return await prisma.photo.delete({
    where: {
      id: id,
    },
  });
};

export const fileStorage = {
  storage: diskStorage({
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

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any) {
    if (value) {
      if (value.size > 10 * 1024 * 1024) {
        throw new HttpException(
          {
            devMessage: 'file-size-exceed',
            message: 'File cannot be uploaded',
          },
          404,
        );
      } else {
        return value;
      }
    }
  }
}
