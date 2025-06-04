import * as Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('production'),
  PORT: Joi.string().default('4000'),
  CORS_ORIGIN: Joi.string().required(),

  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.string().required(),
  DATABASE_URL: Joi.string().uri().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().allow('').required(),
  REDIS_DB: Joi.string().required(),

  COOKIE_DOMAIN: Joi.string().required(),
  COOKIE_SECURE: Joi.string().required(),
  COOKIE_EXPIRATION: Joi.string().required(),
  COOKIE_SECRET: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRATION: Joi.string().required(),
  JWT_ACCESS_EXPIRATION: Joi.string().required(),

  COOKIE_NAME_PREFIX: Joi.string().default('app'),

  MINIO_ROOT_USER: Joi.string().required(),
  MINIO_ROOT_PASSWORD: Joi.string().required(),
  MINIO_PORT: Joi.string().required(),
});
