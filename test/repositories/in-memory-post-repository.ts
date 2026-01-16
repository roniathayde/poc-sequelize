import type { UserRepository } from "../../src/domain/accounts/application/repositories/user-repository"
import { User } from "../../src/domain/accounts/enterprise/entitites/user.entity"
import type { PostRepository } from "../../src/domain/forum/application/repositories/post-repository"
import type { Post } from "../../src/domain/forum/enterprise/entities/post.entity"


export class InMemoryPostRepository implements PostRepository {
  public items: Post[] = []

  async findByAuthorId(authorId: string): Promise<Post | null> {
    const post = this.items.find((post) => post.authorId === authorId)

    if (!post) return null

    return post
  }

  async create(post: Post) {
    this.items.push(post)
  }
}