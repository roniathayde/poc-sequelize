import type { UserRepository } from "../../src/domain/accounts/application/repositories/user-repository"
import { User } from "../../src/domain/accounts/enterprise/entitites/user.entity"


export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async update(user: User): Promise<void> {
    const userIndex = this.items.findIndex((item) => item.id === user.id)

    if (userIndex >= 0) {
      this.items[userIndex] = user
    } else {
      this.items.push(user)
    }
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }
}