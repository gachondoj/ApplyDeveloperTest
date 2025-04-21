import {
  Controller,
  Get,
  Query,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilterProductsDto } from './dto/filter-products.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get('/reports')
  async getReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.productsService.getReport(start, end);
  }
}
