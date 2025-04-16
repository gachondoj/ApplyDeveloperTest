import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

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

  async getAll(page: number = 1) {
    const take = 5;
    const skip = (page - 1) * take;

    const query = this.productRepository
      .createQueryBuilder('product')
      .where('product.deleted = false');

    const [items, total] = await query.skip(skip).take(take).getManyAndCount();

    return { items, total, page, pages: Math.ceil(total / take) };
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.update(id, { deleted: true });
  }
}
