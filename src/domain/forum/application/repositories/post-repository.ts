import type { Post } from "../../enterprise/entities/post.entity";

export interface PostRepository {
  findByAuthorId(authorId: string): Promise<Post | null>;
  save(Post: Post): Promise<void>;
}