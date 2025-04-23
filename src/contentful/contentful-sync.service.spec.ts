import { Test, TestingModule } from '@nestjs/testing';
import { ContentfulSyncService } from './contentful-sync.service';
import { HttpService } from '@nestjs/axios';
import { ProductsService } from '../products/products.service';
import { of } from 'rxjs';

describe('ContentfulSyncService', () => {
  let service: ContentfulSyncService;
  const mockHttpService = { get: jest.fn() };
  const mockProductsService = { create: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentfulSyncService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ProductsService, useValue: mockProductsService },
      ],
    }).compile();

    service = module.get<ContentfulSyncService>(ContentfulSyncService);
  });

  it('should fetch and save products from Contentful', async () => {
    const mockProducts = {
      data: {
        items: [
          {
            fields: {
              name: 'Product 1',
              category: 'Category A',
              price: 99.99,
            },
          },
        ],
      },
    };

    mockHttpService.get.mockReturnValue(of(mockProducts));

    await service['handleCron']();

    expect(mockProductsService.create).toHaveBeenCalledWith({
      name: 'Product 1',
      category: 'Category A',
      price: 99.99,
    });
  });
});
