import { left, right, type Either } from "../../../../core/either";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Post } from "../../enterprise/entities/post.entity";
import type { PostRepository } from "../repositories/post-repository";


interface NewPostUseCaseRequest {
  title: string
  content: string
  authorId: string
}

type NewPostUseCaseResponse = Either<
  null,
  {
    post: Post
  }
>


export class NewPostUseCase {
  constructor(private postRepository: PostRepository) { }

  async execute({ title, content, authorId }: NewPostUseCaseRequest): Promise<NewPostUseCaseResponse> {
    const post = Post.create({
      title,
      content,
      authorId: new UniqueEntityID(authorId)
    });

    await this.postRepository.create(post);

    return right({ post });
  }
}