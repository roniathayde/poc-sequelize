import dotenv from 'dotenv';
dotenv.config();

import { Options } from 'sequelize';


import { Sequelize } from "sequelize";

export const development: Options = {
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'docker',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'minha_poc',
  dialect: 'postgres',
}

export const sequelize = new Sequelize(development)