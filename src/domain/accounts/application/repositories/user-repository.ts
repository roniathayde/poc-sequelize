import type { User } from "../../enterprise/entitites/user.entity";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<void>;
  create(user: User): Promise<void>;
}