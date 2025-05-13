import { SortOrder } from '../../common/enums';
import { PaginationQuery } from '../../common/schema';
import { IUserService } from './interfaces';
import { UserDto } from './schema/user.schema';

export class UserService implements IUserService {
  constructor() {
    console.log(`${UserService.name} initialized.`);
  }

  async insert(user: UserDto) {
    try {
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<UserDto[] | undefined> {
    try {
      return [];
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, user: Partial<UserDto>) {
    try {
      return user;
    } catch (error) {
      throw error;
    }
  }

  async softDelete(id: string): Promise<void> {
    try {
      console.log('User deleted.');
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      console.log('User deleted.');
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<UserDto | undefined> {
    try {
      return {} as UserDto;
    } catch (error) {
      throw error;
    }
  }

  async paginate({
    page = 1,
    limit = 10,
    order = SortOrder.DESC,
  }: PaginationQuery): Promise<UserDto[] | undefined> {
    try {
      const offset = (page - 1) * limit;
      return [];
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
