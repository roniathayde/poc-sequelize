import type { UserRepository } from "../../../../domain/accounts/application/repositories/user-repository";
import { User } from "../../../../domain/accounts/enterprise/entitites/user.entity";
import { SequelizeUserMapper } from "../mappers/sequelize-user-mapper";
import { UserModel } from "../models/user.model";

export class SequelizeUserRepository implements UserRepository {

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { email } })

    if (!user) return null;

    return SequelizeUserMapper.toDomain(user);
  }

  async update(user: User): Promise<void> {
    const data = SequelizeUserMapper.toSequelize(user);

    await UserModel.update(data, {
      where: { id: user.id.toValue() }
    });
  }
  async create(user: User): Promise<void> {
    const data = SequelizeUserMapper.toSequelize(user);

    await UserModel.create(data)
  }
}