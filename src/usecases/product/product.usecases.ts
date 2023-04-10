import { DatabaseProductRepository } from 'src/infrastructure/repositories/product.repository';
import { ILogger } from '../../domain/logger/logger.interface';
import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/domain/model/pagination';
import { ProductM } from '../../domain/model/product';

@Injectable()
export class ProductUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: DatabaseProductRepository,
  ) {}

  async createProduct(product: ProductM): Promise<ProductM> {
    const productCreated = await this.productRepository.insert(product);

    this.logger.log('createProductUseCases execute', 'Product created');

    return productCreated;
  }

  async getProducts(
    page: number,
    limit: number,
  ): Promise<Pagination<ProductM>> {
    const products = await this.productRepository.findAll(page, limit);

    this.logger.log('getProductsUseCases execute', 'Product found');

    return products;
  }

  async getProductById(id: string): Promise<ProductM> {
    const product = await this.productRepository.findById(id);

    this.logger.log('getProductByIdUseCases execute', 'Product found');

    return product;
  }

  async updateProductById(id: string, product: ProductM): Promise<ProductM> {
    const productUpdated = await this.productRepository.updateById(id, product);

    this.logger.log('updateProductByIdUseCases execute', 'Product updated');

    return productUpdated;
  }

  async deleteProductById(id: string): Promise<void> {
    await this.productRepository.deleteById(id);

    this.logger.log('deleteProductByIdUseCases execute', 'Product deleted');
  }
}
