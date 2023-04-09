import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ProductPresenter } from './product.presenter';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { ProductUseCases } from 'src/usecases/product/product.usecases';
import { Product } from 'src/infrastructure/entities/product.entity';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { CreateProductDto } from './product.dto';

@Controller('product')
@ApiTags('product')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductPresenter)
export class ProductController {
  constructor(
    @Inject(UsecasesProxyModule.PRODUCT_USECASES_PROXY)
    private readonly productUseCases: UseCaseProxy<ProductUseCases>,
  ) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productUseCases.getInstance().getProducts();
  }

  @Post()
  async create(@Body() product: CreateProductDto): Promise<Product> {
    return this.productUseCases.getInstance().createProduct(product);
  }
}
