import { UserM, UserWithoutPassword } from 'src/domain/model/user';

import { AuthUserConfig } from 'src/domain/config/auth-user.interface';
import { BcryptService } from './../../infrastructure/services/bcrypt/bcrypt.service';
import { ILogger } from 'src/domain/logger/logger.interface';
import { Pagination } from 'src/domain/model/pagination';
import { Role } from 'src/infrastructure/common/enums/role.enum';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';

export class UserUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly authUserConfig: AuthUserConfig,
    private readonly logger: ILogger,
  ) {
    this.createDefaultUser();
  }

  async getUserByUsername(username: string): Promise<UserM> {
    this.logger.log(
      'UserUseCases execute',
      `The user ${username} have been logged.`,
    );

    return await this.userRepository.getUserByUsername(username);
  }

  async getUsers(
    page: number,
    limit: number,
  ): Promise<Pagination<UserWithoutPassword>> {
    this.logger.log(
      'UserUseCases execute',
      `Users page ${page} obtained with limit ${limit}.`,
    );

    return await this.userRepository.getUsers(page, limit);
  }

  async deleteUser(id: string): Promise<void> {
    this.logger.log('UserUseCases execute', `User with id ${id} deleted.`);

    return await this.userRepository.deleteUser(id);
  }

  async restoreUser(id: string): Promise<void> {
    this.logger.log('UserUseCases execute', `User with id ${id} restored.`);
    return await this.userRepository.restoreUser(id);
  }

  async updateUser(user: Partial<UserM>): Promise<void> {
    this.logger.log('UserUseCases execute', `User with id ${user.id} updated.`);

    if (user.password)
      user.password = await this.bcryptService.hash(user.password);

    return await this.userRepository.updateUser(user);
  }

  async createUser(user: UserM): Promise<void> {
    const userExists = await this.userRepository.getUserByUsername(
      user.username,
    );

    if (userExists) {
      throw new Error('User already exists');
    }

    this.logger.log(
      'UserUseCases execute',
      `User with username ${user.username} created.`,
    );

    user.password = await this.bcryptService.hash(user.password);
    return await this.userRepository.createUser(user);
  }

  async createDefaultUser(): Promise<void> {
    const userExists = await this.userRepository.getUserByUsername(
      this.authUserConfig.getAuthUser(),
    );

    if (userExists) {
      return;
    }

    this.logger.log('UserUseCases execute', `Default user created.`);

    const user = new UserM();
    user.username = this.authUserConfig.getAuthUser();
    user.password = await this.bcryptService.hash(
      this.authUserConfig.getAuthPassword(),
    );
    user.role = Role.Owner;

    return await this.userRepository.createUser(user);
  }
}
