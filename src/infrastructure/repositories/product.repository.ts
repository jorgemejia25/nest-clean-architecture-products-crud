import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductM } from 'src/domain/model/product';
import { ProductRepository } from 'src/domain/repositories/productRepository.interface';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  insert(todo: ProductM): Promise<ProductM> {
    return this.productRepository.save(todo);
  }

  findAll(): Promise<ProductM[]> {
    return this.productRepository.find();
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
