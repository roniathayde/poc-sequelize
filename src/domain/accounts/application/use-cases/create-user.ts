import { User } from "../../enterprise/entitites/user.entity";
import type { UserRepository } from "../repositories/user-repository";


interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}


export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute({ name, email, password }: CreateUserUseCaseRequest): Promise<User> {
    const alreadyExists = await this.userRepository.findByEmail(email);
    if (alreadyExists) throw new Error("Usuário já cadastrado.");

    const user = User.create({
      name,
      email,
      password,
    });

    await this.userRepository.save(user);

    return user;
  }
}