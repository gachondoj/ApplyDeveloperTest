import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { ContentfulSyncService } from './contentful-sync.service';
import { ProductsModule } from '../products/product.module';
import { ContentfulController } from './contentful-sync.controller';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot(), ProductsModule],
  providers: [ContentfulSyncService],
  controllers: [ContentfulController],
})
export class ContentfulModule {}
