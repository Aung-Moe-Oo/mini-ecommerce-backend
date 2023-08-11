import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { Responser } from './utils/responser';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('file/uploads/:fileName')
  @ApiOperation({ summary: 'Show Photo' })
  seeUploadedFile(@Param('fileName') name: string, @Res() res: Response) {
    return res.sendFile(name, { root: `./uploads/` });
  }
}
