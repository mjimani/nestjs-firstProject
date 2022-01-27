import { Controller, Get, Param, Query } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("test")
  getHelloTest(@Param("key") key: string): string {
    return this.appService.getHelloTest(key);
  }
}