import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateUserUseCase } from '../../../domain/accounts/application/use-cases/create-user';
import { UserAlreadyExistsError } from '../../../core/errors/user-already-exists-error';
import { UserPresenter } from './presenters/create-user-presenter';
import { SequelizeUserRepository } from '../../database/sequelize/repositories/sequelize-user-repository';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) { }

  async handle(req: Request, res: Response) {
    const createUserBodySchema = z.object({
      username: z.string(),
      email: z.email(),
      password: z.string().min(6).max(16),
    });

    const resultBody = createUserBodySchema.safeParse(req.body);

    if (!resultBody.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: resultBody.error.format()
      });
    }

    const { username, email, password } = resultBody.data;

    const result = await this.createUserUseCase.execute({
      username,
      email,
      password,
    });




    if (result.isLeft()) {
      const error = result.value;

      if (error instanceof UserAlreadyExistsError) {
        return res.status(409).json({ message: error.message });
      }

      return res.status(400).json({ message: 'Unexpected error' });
    }

    const { user } = result.value;
    return res.status(201).json({
      user: UserPresenter.toHTTP(user),
    });
  }
}

const userRepository = new SequelizeUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
export const createUserController = new CreateUserController(createUserUseCase);