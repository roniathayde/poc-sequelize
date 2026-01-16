import type { User } from "../../enterprise/entitites/user.entity";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}