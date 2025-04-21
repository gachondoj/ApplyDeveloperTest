import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThan, Repository } from 'typeorm';
import { Product } from './product.entity';
import { FilterProductsDto } from './dto/filter-products.dto';
import { CategoryCount } from 'src/interfaces/products.interfaces';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async getAll(filters: FilterProductsDto) {
    const take = 5;
    const skip = (filters.page || 1 - 1) * take;

    const query = this.productRepository
      .createQueryBuilder('product')
      .where('product.deleted = false');

    if (filters.name) {
      query.andWhere('product.name ILIKE :name', { name: `%${filters.name}%` });
    }
    if (filters.category) {
      query.andWhere('product.category = :category', {
        category: filters.category,
      });
    }
    if (filters.minPrice) {
      query.andWhere('product.price >= :minPrice', {
        minPrice: filters.minPrice,
      });
    }
    if (filters.maxPrice) {
      query.andWhere('product.price <= :maxPrice', {
        maxPrice: filters.maxPrice,
      });
    }

    const [items, total] = await query.skip(skip).take(take).getManyAndCount();

    return {
      items,
      total,
      page: filters.page || 1,
      pages: Math.ceil(total / take),
    };
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.update(id, { deleted: true });
  }

  async getReport(startDate?: Date, endDate?: Date) {
    const total = await this.productRepository.count();
    const deleted = await this.productRepository.count({
      where: { deleted: true },
    });
    const nonDeleted = await this.productRepository.count({
      where: { deleted: false },
    });

    const withPrice = await this.productRepository.count({
      where: { deleted: false, price: MoreThan(0) },
    });

    const withoutPrice = await this.productRepository.count({
      where: { deleted: false, price: 0 },
    });

    const dateRange = await this.productRepository.count({
      where: {
        deleted: false,
        createdAt: Between(
          startDate || new Date('1970-01-01'),
          endDate || new Date(),
        ),
      },
    });

    const categoryCounts = await this.productRepository
      .createQueryBuilder('product')
      .select('product.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .where('product.deleted = :deleted', { deleted: false })
      .groupBy('product.category')
      .getRawMany();

    const categoryPercentages = categoryCounts.map((item: CategoryCount) => ({
      category: item.category,
      count: Number(item.count),
      percentage:
        total > 0 ? ((Number(item.count) / total) * 100).toFixed(2) : 0,
    }));

    return {
      deleted: total ? ((deleted / total) * 100).toFixed(2) : 0,
      withPrice: nonDeleted ? ((withPrice / nonDeleted) * 100).toFixed(2) : 0,
      withoutPrice: nonDeleted
        ? ((withoutPrice / nonDeleted) * 100).toFixed(2)
        : 0,
      dateRange: nonDeleted ? ((dateRange / nonDeleted) * 100).toFixed(2) : 0,
      categoryPercentages,
    };
  }
}
