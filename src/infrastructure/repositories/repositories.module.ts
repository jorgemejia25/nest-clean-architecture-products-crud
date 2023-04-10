import { DatabaseProductRepository } from './product.repository';
import { DatabaseUserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Product, User])],
  providers: [DatabaseProductRepository, DatabaseUserRepository],
  exports: [DatabaseProductRepository, DatabaseUserRepository],
})
export class RepositoriesModule {}
