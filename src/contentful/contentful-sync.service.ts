import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ProductsService } from '../products/products.service';
import { ContentfulResponse } from 'src/interfaces/contentful.interfaces';

@Injectable()
export class ContentfulSyncService {
  private readonly logger = new Logger(ContentfulSyncService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly productsService: ProductsService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleInterval() {
    this.logger.log('Fetching products from Contentful...');
    const url = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=${process.env.CONTENTFUL_CONTENT_TYPE}`;

    try {
      const response = await lastValueFrom(
        this.httpService.get<ContentfulResponse>(url),
      );
      const products = response.data.items;

      for (const product of products) {
        const mappedProduct = {
          name: product.fields.name,
          category: product.fields.category,
          price: product.fields.price ?? 0,
        };
        await this.productsService.create(mappedProduct);
      }

      this.logger.log(
        `Synchronized ${products.length} products from Contentful.`,
      );
    } catch (error) {
      this.logger.error('Error syncing Contentful data', error);
    }
  }
}
