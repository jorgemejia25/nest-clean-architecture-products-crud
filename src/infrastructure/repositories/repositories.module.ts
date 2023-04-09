import { DatabaseProductRepository } from './product.repository';
import { Module } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Product])],
    providers: [
        DatabaseProductRepository
    ],
    exports: [
        DatabaseProductRepository
    ],
})
export class RepositoriesModule {}
