import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: Repository<Product>;

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    count: jest.fn().mockResolvedValue(10),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
      getRawMany: jest.fn().mockResolvedValue([]),
    })),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a paginated product list', async () => {
    const result = await service.getAll({ page: 1 });
    expect(result).toEqual({ items: [], total: 0, page: 1, pages: 0 });
  });

  it('should soft delete a product', async () => {
    await service.delete('1');
    expect(mockRepo.update).toHaveBeenCalledWith('1', { deleted: true });
  });

  it('should calculate report data', async () => {
    repo.count = jest.fn().mockResolvedValueOnce(100).mockResolvedValueOnce(10);
    const report = await service.getReport();
    expect(report.deleted).toBe('10.00');
  });
});
