import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

export interface UserProps {
  name: string
  email: string
  password: string
}
export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get password() {
    return this.props.password;
  }

  private set password(value: string) {
    this.props.password = value;
  }

  get email() {
    return this.props.email;
  }

  private set email(value: string) {
    this.props.email = value;
  }


  public updateName(newName: string) {
    if (newName.length < 3) throw new Error("Nome muito curto.");
    this.name = newName;
  }

  static create(props: UserProps, id?: string) {
    return new User(props, id ? new UniqueEntityID(id) : undefined);
  }
}