import { Controller, Get, Query, Delete, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(@Query('page') page: number) {
    return this.productsService.getAll(page);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    await this.productsService.delete(id);
    return { message: 'Product marked as deleted.' };
  }
}
