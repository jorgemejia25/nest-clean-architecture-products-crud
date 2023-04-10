import { AuthUserConfig } from 'src/domain/config/auth-user.interface';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/domain/config/database.interface';
import { Injectable } from '@nestjs/common';
import { JWTConfig } from 'src/domain/config/jwt.interface';

@Injectable()
export class EnvironmentConfigService
  implements DatabaseConfig, JWTConfig, AuthUserConfig
{
  constructor(private readonly configService: ConfigService) {}

  getAuthUser(): string {
    return this.configService.get<string>('AUTH_USER');
  }
  getAuthPassword(): string {
    return this.configService.get<string>('AUTH_PASSWORD');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DB_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DB_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DB_USERNAME');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DB_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DB_NAME');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }
}
