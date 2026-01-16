import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

export interface PostProps {
  title: string
  content: string
  authorId: UniqueEntityID
}

export class Post extends Entity<PostProps> {
  get title() {
    return this.props.title;
  }

  private set title(value: string) {
    this.props.title = value;
  }

  get content() {
    return this.props.content;
  }

  private set content(value: string) {
    this.props.content = value;
  }

  static create(props: PostProps, id?: string) {
    return new Post(props, id ? new UniqueEntityID(id) : undefined);
  }
}