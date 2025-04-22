import { ApiProperty } from '@nestjs/swagger';

export class CategoryPercentageDto {
  @ApiProperty()
  category: string;

  @ApiProperty()
  count: number;

  @ApiProperty()
  percentage: string | number;
}

export class ProductReportResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  deletedPercentage: string;

  @ApiProperty()
  activePercentage: string;

  @ApiProperty()
  withPrice: number;

  @ApiProperty()
  withoutPrice: number;

  @ApiProperty()
  dateFilteredCount: number;

  @ApiProperty({ type: [CategoryPercentageDto] })
  categoryPercentages: CategoryPercentageDto[];
}
