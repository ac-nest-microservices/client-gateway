import 'dotenv/config';
import * as joi from 'joi';

type EnvVars = {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;
};

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const config = {
  port: envVars.PORT,
  productsMicroservice: {
    host: envVars.PRODUCTS_MICROSERVICE_HOST,
    port: envVars.PRODUCTS_MICROSERVICE_PORT,
  },
};