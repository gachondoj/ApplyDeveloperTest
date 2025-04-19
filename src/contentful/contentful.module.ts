import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { ContentfulSyncService } from './contentful-sync.service';
import { ProductsModule } from '../products/product.module';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot(), ProductsModule],
  providers: [ContentfulSyncService],
})
export class ContentfulModule {}
