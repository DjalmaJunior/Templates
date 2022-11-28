import dotenv from 'dotenv'
dotenv.config();

export default {
  AUTH_KEY: process.env.AUTH_KEY,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  APPLICATION_NAME: process.env.APPLICATION_NAME
}
