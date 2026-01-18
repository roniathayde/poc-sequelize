import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

export interface UserProps {
  username: string
  email: string
  password: string
}
export class User extends Entity<UserProps> {
  get username() {
    return this.props.username;
  }

  private set username(value: string) {
    this.props.username = value;
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
    this.username = newName;
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    return new User(props, id ? id : undefined);
  }
}