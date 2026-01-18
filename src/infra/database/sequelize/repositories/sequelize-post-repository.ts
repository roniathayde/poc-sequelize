import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import type { PostRepository } from "../../../../domain/forum/application/repositories/post-repository";
import { Post } from "../../../../domain/forum/enterprise/entities/post.entity";
import { SequelizePostMapper } from "../mappers/sequelize-post-mapper";
import { PostModel } from "../models/post.model";

export class SequelizePostRepository implements PostRepository {
  async findByAuthorId(authorId: string): Promise<Post | null> {
    const post = await PostModel.findOne({ where: { authorId } });

    if (!post) return null;

    return SequelizePostMapper.toDomain(post);
  }

  async create(post: Post): Promise<void> {
    const data = SequelizePostMapper.toSequelize(post);

    await PostModel.create(data)
  }
}