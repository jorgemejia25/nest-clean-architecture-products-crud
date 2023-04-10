import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserM, UserWithoutPassword } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { User } from '../entities/user.entity';
import { Pagination } from 'src/domain/model/pagination';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}
  async updateRefreshToken(
    username: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userEntityRepository.update(
      {
        username: username,
      },
      { hach_refresh_token: refreshToken },
    );
  }
  async getUserByUsername(username: string): Promise<UserM> {
    const adminUserEntity = await this.userEntityRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!adminUserEntity) {
      return null;
    }
    return this.toUser(adminUserEntity);
  }
  async updateLastLogin(username: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        username: username,
      },
      { last_login: () => 'CURRENT_TIMESTAMP' },
    );
  }

  private toUser(adminUserEntity: User): UserM {
    const adminUser: UserM = new UserM();

    adminUser.id = adminUserEntity.id;
    adminUser.username = adminUserEntity.username;
    adminUser.password = adminUserEntity.password;
    adminUser.createDate = adminUserEntity.createdate;
    adminUser.updatedDate = adminUserEntity.updateddate;
    adminUser.role = adminUserEntity.role;
    adminUser.lastLogin = adminUserEntity.last_login;
    adminUser.hashRefreshToken = adminUserEntity.hach_refresh_token;
    adminUser.active = adminUserEntity.active;

    return adminUser;
  }

  private toUserEntity(adminUser: UserM): User {
    const adminUserEntity: User = new User();

    adminUserEntity.username = adminUser.username;
    adminUserEntity.role = adminUser.role;
    adminUserEntity.password = adminUser.password;
    adminUserEntity.last_login = adminUser.lastLogin;
    adminUserEntity.hach_refresh_token = adminUser.hashRefreshToken;

    return adminUserEntity;
  }

  private toUserWithoutPassword(adminUserEntity: User): UserWithoutPassword {
    const adminUser: UserWithoutPassword = new UserWithoutPassword();

    adminUser.id = adminUserEntity.id;
    adminUser.username = adminUserEntity.username;
    adminUser.createDate = adminUserEntity.createdate;
    adminUser.updatedDate = adminUserEntity.updateddate;
    adminUser.role = adminUserEntity.role;
    adminUser.lastLogin = adminUserEntity.last_login;
    adminUser.hashRefreshToken = adminUserEntity.hach_refresh_token;
    adminUser.active = adminUserEntity.active;

    return adminUser;
  }

  async getUsers(
    page: number,
    limit: number,
  ): Promise<Pagination<UserWithoutPassword>> {
    const users = await this.userEntityRepository.find({
      skip: page * limit,
      take: limit,
    });

    const total = await this.userEntityRepository.count();
    const pages = Math.ceil(total / limit);

    return {
      page,
      pages,
      limit,
      total,
      data: users.map((user) => this.toUserWithoutPassword(user)),
    };
  }

  async deleteUser(id: string): Promise<void> {
    await this.userEntityRepository.update(id, { active: false });
  }

  async restoreUser(id: string): Promise<void> {
    await this.userEntityRepository.update(id, { active: true });
  }

  async updateUser(user: UserM): Promise<void> {
    await this.userEntityRepository.update(user.id, this.toUserEntity(user));
  }

  async createUser(user: UserM): Promise<void> {
    await this.userEntityRepository.save(this.toUserEntity(user));
  }
}
