import type { User } from "../../../../domain/accounts/enterprise/entitites/user.entity";

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
    };
  }
}