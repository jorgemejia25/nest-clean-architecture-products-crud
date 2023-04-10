import { BcryptModule } from './infrastructure/services/bcrypt/bcrypt.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshTokenStrategy } from './infrastructure/common/stategies/jwtRefresh.strategy';
import { JwtModule as JwtServiceModule } from './infrastructure/services/jwt/jwt.module';
import { JwtStrategy } from './infrastructure/common/stategies/jwt.strategy';
import { LocalStrategy } from './infrastructure/common/stategies/local.strategy';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.secret,
    }),
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule.register(),
    ControllersModule,
    BcryptModule,
    JwtServiceModule,
    EnvironmentConfigModule,
  ],
  providers: [LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AppModule {}
