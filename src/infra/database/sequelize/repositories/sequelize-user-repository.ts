import type { UserRepository } from "../../../../domain/accounts/application/repositories/user-repository";
import { User } from "../../../../domain/accounts/enterprise/entitites/user.entity";

export class SequelizeUserRepository implements UserRepository {
  constructor(private userModel: UserModel)

  async findByEmail(email: string): Promise<User | null> {
    const userModel = await this.userModel.findOne({ where: { email } });
    if (!userModel) return null;

    return User
  }

  async save(user: User): Promise<void> {
    await this.userModel.create({
      id: user.id,
      name: user.name,
      email: user.email
    });
  }
}