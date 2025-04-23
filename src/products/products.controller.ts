import {
  Controller,
  Get,
  Query,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { FilterProductsDto } from './dto/filter-products.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductListResponseDto } from './dto/product-response.dto';
import { ProductReportResponseDto } from './dto/product-report-response.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    type: ProductListResponseDto,
    description: 'List of products paginated',
  })
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
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: ProductReportResponseDto,
    description: 'Statistical report about products',
  })
  async getReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.productsService.getReport(start, end);
  }
}
