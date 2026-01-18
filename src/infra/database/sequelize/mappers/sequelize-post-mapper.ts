import { UniqueEntityID } from "../../../../core/entities/unique-entity-id"

import { Attributes } from 'sequelize'
import type { PostModel } from "../models/post.model"
import { Post } from "../../../../domain/forum/enterprise/entities/post.entity"



export abstract class SequelizePostMapper {
  static toDomain(raw: PostModel): Post {
    return Post.create(
      {
        title: raw.get('title'),
        content: raw.get('content'),
        authorId: new UniqueEntityID(raw.get('authorId')),
      },
      new UniqueEntityID(raw.get('id')),
    )
  }

  static toSequelize(Post: Post): Attributes<PostModel> {
    return {
      id: Post.id.toValue(),
      title: Post.title,
      content: Post.content,
      authorId: Post.authorId.toString()
    }
  }
}