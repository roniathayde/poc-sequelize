import { left, right, type Either } from "../../../../core/either";
import { UserAlreadyExistsError } from "../../../../core/errors/user-already-exists-error";
import { User } from "../../enterprise/entitites/user.entity";
import type { UserRepository } from "../repositories/user-repository";


interface CreateUserUseCaseRequest {
  username: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>


export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute({ username, email, password }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const alreadyExists = await this.userRepository.findByEmail(email);
    if (alreadyExists) {
      return left(new UserAlreadyExistsError());
    }

    const user = User.create({
      username,
      email,
      password,
    });

    await this.userRepository.create(user);

    return right({ user });
  }
}