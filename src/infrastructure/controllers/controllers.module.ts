import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [ProductController],
})
export class ControllersModule {}
