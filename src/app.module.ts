import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StorageController } from './storage/storage.controller';
import { StorageService } from './storage/storage.service';
import { FormModule } from './form/form.module';

@Module({
  imports: [PrismaModule, FormModule],
  controllers: [StorageController],
  providers: [StorageService],
})
export class AppModule {
}
