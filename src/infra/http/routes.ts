import { Router } from 'express';
import { createUserController, } from './controllers/create-user.controller';
import { createPostController } from './controllers/create-post.controller';

const router = Router();

router.post('/users', (req, res) => createUserController.handle(req, res));
router.post('/posts', (req, res) => createPostController.handle(req, res))


export { router };