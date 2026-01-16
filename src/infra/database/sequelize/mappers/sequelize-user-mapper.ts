import { UniqueEntityID } from "../../../../core/entities/unique-entity-id"
import type { User } from "../../../../domain/accounts/enterprise/entitites/user.entity"


export abstract class SequelizeUserMapper {
  static toDomain(UserSequelize: UserSequelize): User {
    return User.create(
      {
        name: UserSequelize.name,
        email: UserSequelize.email,
        password: UserSequelize.password,
      },
      new UniqueEntityID(UserSequelize.id),
    )
  }

  static toPrisma(question: User): User {
    return {
      id: question.id.toString(),
      name: question.name,
      email: question.email,
      password: question.password,
    }
  }
}