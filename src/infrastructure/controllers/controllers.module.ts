import { AuthController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [ProductController, AuthController, UsersController],
})
export class ControllersModule {}
