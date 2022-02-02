import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFileDomainDto } from './dto/createFileDomain.dto';

@Injectable()
export class StorageService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {
  }

  async createFileDomain(fileDomainDto: CreateFileDomainDto) {
    return await this.prismaService.fileDomain.create({
      data: fileDomainDto,
    });
  }

  getList() {
    return this.prismaService.fileDomain.findMany();
  }

  async getOne(id: string) {
    return await this.prismaService.fileDomain.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }
}
