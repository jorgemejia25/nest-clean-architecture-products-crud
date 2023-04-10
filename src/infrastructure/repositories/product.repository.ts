import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductM } from 'src/domain/model/product';
import { ProductRepository } from 'src/domain/repositories/productRepository.interface';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/domain/model/pagination';

@Injectable()
export class DatabaseProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  insert(todo: ProductM): Promise<ProductM> {
    return this.productRepository.save(todo);
  }

  async findAll(page: number, limit: number): Promise<Pagination<ProductM>> {
    const products = await this.productRepository.find({
      skip: page,
      take: limit,
    });

    const total = await this.productRepository.count();
    const pages = Math.ceil(total / limit);

    return {
      page,
      limit,
      pages,
      total,
      data: products,
    };
  }

  findById(id: string): Promise<ProductM> {
    return this.productRepository.findOne({
      where: {
        id,
      },
    });
  }
  updateById(id: string, todo: ProductM): Promise<ProductM> {
    return this.productRepository.save({
      id,
      ...todo,
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.productRepository.delete({
      id,
    });
  }
}
