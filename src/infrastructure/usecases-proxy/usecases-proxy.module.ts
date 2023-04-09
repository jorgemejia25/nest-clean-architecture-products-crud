import { DynamicModule, Module } from '@nestjs/common';

import { DatabaseProductRepository } from '../repositories/product.repository';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { ProductUseCases } from 'src/usecases/product/product.usecases';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static PRODUCT_USECASES_PROXY = 'productUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseProductRepository, LoggerService],
          provide: UsecasesProxyModule.PRODUCT_USECASES_PROXY,
          useFactory: (productRepository: DatabaseProductRepository) =>
            new UseCaseProxy(
              new ProductUseCases(LoggerService, productRepository),
            ),
        },
      ],
      exports: [UsecasesProxyModule.PRODUCT_USECASES_PROXY],
    };
  }
}
