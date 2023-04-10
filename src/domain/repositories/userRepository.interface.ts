import { UserM, UserWithoutPassword } from '../model/user';

import { Pagination } from '../model/pagination';

export interface UserRepository {
  getUserByUsername(username: string): Promise<UserM>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
  getUsers(
    page: number,
    limit: number,
  ): Promise<Pagination<UserWithoutPassword>>;
  deleteUser(id: string): Promise<void>;
  restoreUser(id: string): Promise<void>;
  updateUser(user: Partial<UserM>): Promise<void>;
  createUser(user: UserM): Promise<void>;
}
