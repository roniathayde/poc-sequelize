import type { Post } from "../../enterprise/entities/post.entity";

export interface PostRepository {
  findByAuthorId(authorId: string): Promise<Post | null>;
  create(post: Post): Promise<void>;
}