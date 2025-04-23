import { ApiProperty } from '@nestjs/swagger';

export class ProductItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  deleted: boolean;

  @ApiProperty()
  createdAt: Date;
}

export class ProductListResponseDto {
  @ApiProperty({ type: [ProductItemDto] })
  items: ProductItemDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  pages: number;
}
