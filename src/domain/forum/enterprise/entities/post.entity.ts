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

  get authorId() {
    return this.props.authorId;
  }

  static create(props: PostProps, id?: UniqueEntityID) {
    return new Post(props, id ? id : undefined);
  }
}