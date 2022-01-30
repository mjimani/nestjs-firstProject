import { Controller, Get, Param, Post, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getHelloTest(@Param('key') key: string): string {
    return this.appService.getHelloTest(key);
  }

  @Get('users')
  async users() {
    return await this.prismaService.user.findMany();
  }

  @Post('users')
  async addUser(@Body() createUserDto: any) {
    return await this.prismaService.user.create({ data: createUserDto });
  }
}