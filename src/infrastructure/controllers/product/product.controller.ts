import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ProductPresenter } from './product.presenter';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { ProductUseCases } from 'src/usecases/product/product.usecases';
import { Product } from 'src/infrastructure/entities/product.entity';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { CreateProductDto } from './product.dto';
import { PaginatorPipe } from 'src/infrastructure/common/pipes/paginator.pipe';
import { PaginationPresenter } from 'src/infrastructure/common/swagger/presenters/pagination.presenter';
import { Pagination } from 'src/domain/model/pagination';
import { ProductM } from 'src/domain/model/product';

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
  @ApiOperation({
    description: 'Get all products paginated',
  })
  async findAll(
    @Query(PaginatorPipe) { page, limit }: PaginationPresenter,
  ): Promise<Pagination<ProductM>> {
    return this.productUseCases.getInstance().getProducts(page, limit);
  }

  @Post()
  async create(@Body() product: CreateProductDto): Promise<Product> {
    return this.productUseCases.getInstance().createProduct(product);
  }
}
