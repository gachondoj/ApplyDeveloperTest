import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty()
  mostExpensiveProduct: string;
}
