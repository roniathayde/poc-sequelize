import { UniqueEntityID } from "../../../../core/entities/unique-entity-id"
import { User } from "../../../../domain/accounts/enterprise/entitites/user.entity"
import { UserModel } from "../models/user.model"
import { Attributes } from 'sequelize'



export abstract class SequelizeUserMapper {
  static toDomain(raw: UserModel): User {
    return User.create(
      {
        username: raw.get('username'),
        email: raw.get('email'),
        password: raw.get('password'),
      },
      new UniqueEntityID(raw.get('id')),
    )
  }

  static toSequelize(user: User): Attributes<UserModel> {
    return {
      id: user.id.toValue(),
      username: user.username,
      email: user.email,
      password: user.password,
    }
  }
}