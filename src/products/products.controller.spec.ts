import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockService = {
    getAll: jest.fn().mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      pages: 0,
    }),
    delete: jest.fn(),
    getReport: jest.fn().mockResolvedValue({
      deleted: 0,
      withPrice: 0,
      withoutPrice: 0,
      dateRange: 0,
      categoryPercentages: [],
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should return product list', async () => {
    const result = await controller.getAll({});
    expect(result).toEqual({ items: [], total: 0, page: 1, pages: 0 });
  });

  it('should delete a product', async () => {
    await controller.deleteProduct('1');
    expect(mockService.delete).toHaveBeenCalledWith('1');
  });

  it('should return a report', async () => {
    const result = await controller.getReport();

    expect(result).toHaveProperty('deleted');
    expect(result).toHaveProperty('withPrice');
    expect(result).toHaveProperty('withoutPrice');
    expect(result).toHaveProperty('dateRange');
    expect(result).toHaveProperty('categoryPercentages');
    expect(Array.isArray(result.categoryPercentages)).toBe(true);
  });
});
