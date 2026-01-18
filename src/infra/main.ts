import 'reflect-metadata';
import express from 'express';
import { router } from './http/routes';

const app = express();

app.use(express.json());

app.use(router);

app.listen(3333, () => {
  console.log('🚀 HTTP Server running on http://localhost:3333');
});