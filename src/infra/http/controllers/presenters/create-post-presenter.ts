import type { Post } from "../../../../domain/forum/enterprise/entities/post.entity";

export class PostPresenter {
  static toHTTP(post: Post) {
    return {
      id: post.id.toString(),
      authorId: post.authorId.toString(),
      content: post.content,
      title: post.title,
    };
  }
}