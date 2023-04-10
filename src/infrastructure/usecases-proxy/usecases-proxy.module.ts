import { DynamicModule, Module } from '@nestjs/common';

import { AuthUseCases } from 'src/usecases/auth/auth.usecases';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { DatabaseProductRepository } from '../repositories/product.repository';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { ProductUseCases } from 'src/usecases/product/product.usecases';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './usecases-proxy';
import { UserUseCases } from 'src/usecases/user/user.usecases';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class UsecasesProxyModule {
  static PRODUCT_USECASES_PROXY = 'productUseCasesProxy';
  static AUTH_USECASES_PROXY = 'authUseCasesProxy';
  static USER_USECASES_PROXY = 'userUseCasesProxy';

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
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            BcryptService,
          ],
          provide: UsecasesProxyModule.AUTH_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            jwtConfig: EnvironmentConfigService,
            userRepository: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new AuthUseCases(
                logger,
                jwtTokenService,
                jwtConfig,
                userRepository,
                bcryptService,
              ),
            ),
        },
        {
          inject: [
            DatabaseUserRepository,
            BcryptService,
            EnvironmentConfigService,
            LoggerService,
          ],
          provide: UsecasesProxyModule.USER_USECASES_PROXY,
          useFactory: (
            userRepository: DatabaseUserRepository,
            bcryptService: BcryptService,
            authUserConfig: EnvironmentConfigService,
            logger: LoggerService,
          ) =>
            new UseCaseProxy(
              new UserUseCases(
                userRepository,
                bcryptService,
                authUserConfig,
                logger,
              ),
            ),
        },
      ],
      exports: [
        UsecasesProxyModule.PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.AUTH_USECASES_PROXY,
        UsecasesProxyModule.USER_USECASES_PROXY,
      ],
    };
  }
}
