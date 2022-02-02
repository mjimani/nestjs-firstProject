import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Response,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from './storage.service';
import { CreateFileDomainDto } from './dto/createFileDomain.dto';
import { GetFileDomainDto } from './dto/getFileDomain.dto';

@Controller('storage')
export class StorageController {

  constructor(
    private readonly storageService: StorageService,
  ) {
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './file-resource',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${file.originalname}`);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    let createFileDomainDto = new CreateFileDomainDto();
    createFileDomainDto.originalName = file.originalname;
    createFileDomainDto.mimeType = file.mimetype;
    createFileDomainDto.path = file.path;
    createFileDomainDto.size = file.size;
    return await this.storageService.createFileDomain(createFileDomainDto);
  }

  @Get('list')
  getFileList() {
    return this.storageService.getList();
  }

  @Get('get-file/by-id')
  async getFile(@Query('id') id: string,@Response({ passthrough: true }) res): Promise<StreamableFile> {
    let getFileDomainDto: GetFileDomainDto;
    getFileDomainDto = await this.storageService.getOne(id);
    console.log(getFileDomainDto);
    const file = createReadStream(join(process.cwd(), getFileDomainDto.path));
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="Javaherdeh-village-Iran-Destination.jpg"',
    });
    return new StreamableFile(file);
  }
}
