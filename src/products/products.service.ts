import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { FilterProductsDto } from './dto/filter-products.dto';

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
}
