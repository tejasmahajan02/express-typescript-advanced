import { UserDto } from "../schema/user.schema";

export interface IUserService {
  insert(userData: UserDto): Promise<UserDto>;
}
