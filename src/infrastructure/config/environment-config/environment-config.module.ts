import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigService } from './environment-config.service';
import { Module } from '@nestjs/common';
import { validate } from './environment-config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env/local.env',
      isGlobal: true,
      validate,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
