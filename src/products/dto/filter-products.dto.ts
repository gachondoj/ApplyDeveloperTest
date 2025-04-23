import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterProductsDto {
  @ApiPropertyOptional({ description: 'Product name filter' })
  name?: string;

  @ApiPropertyOptional({ description: 'Product category filter' })
  category?: string;

  @ApiPropertyOptional({ description: 'Minimum price' })
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Maximum price' })
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  page?: number;
}
