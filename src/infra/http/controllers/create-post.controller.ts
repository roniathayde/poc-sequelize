import { Request, Response } from 'express';
import { z } from 'zod';
import { NewPostUseCase } from '../../../domain/forum/application/use-cases/new-post';
import { PostPresenter } from './presenters/create-post-presenter';
import { SequelizePostRepository } from '../../database/sequelize/repositories/sequelize-post-repository';

export class CreatePostController {
  constructor(private newPostUseCase: NewPostUseCase) { }

  async handle(req: Request, res: Response) {
    const createPostBodySchema = z.object({
      authorId: z.uuid(),
      content: z.string().max(255),
      title: z.string().max(100),
    });

    const resultBody = createPostBodySchema.safeParse(req.body);

    if (!resultBody.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: resultBody.error.format()
      });
    }

    const { authorId, content, title } = resultBody.data;

    const result = await this.newPostUseCase.execute({
      authorId,
      content,
      title
    });

    if (result.isLeft()) {
      return res.status(400).json({ message: 'Unexpected error' });
    }

    const { post } = result.value;
    return res.status(201).json({
      post: PostPresenter.toHTTP(post),
    });
  }
}

const postRepository = new SequelizePostRepository();
const createPostUseCase = new NewPostUseCase(postRepository);
export const createPostController = new CreatePostController(createPostUseCase);