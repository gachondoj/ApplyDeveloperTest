import { Controller, Get, Query, Delete, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilterProductsDto } from './dto/filter-products.dto';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(@Query() filterDto: FilterProductsDto) {
    return this.productsService.getAll(filterDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    await this.productsService.delete(id);
    return { message: 'Product marked as deleted.' };
  }
}
