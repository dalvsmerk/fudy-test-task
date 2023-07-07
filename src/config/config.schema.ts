import * as Joi from 'joi';

export default () => {
  return Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production').required(),
    PORT: Joi.number().integer().required(),
    DATABASE_HOST: Joi.string().hostname().required(),
    DATABASE_PORT: Joi.number().integer().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
  });
};
