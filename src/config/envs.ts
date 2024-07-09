import 'dotenv/config';
import * as joi from 'joi';

// 1. Define the shape of the environment variables
interface IEnvVars {
  PORT: number;
  PRODUCTS_MS_HOST: string;
  PRODUCTS_MS_PORT: number;
}

// 2. Validate the environment variables
const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required(),
  })
  .unknown(true); // Allow unknown properties

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: \${error.message}`);
}

const envVars: IEnvVars = value;

// 3. Export the environment variables
export const envs = {
  port: envVars.PORT,
  productsMsHost: envVars.PRODUCTS_MS_HOST,
  productsMsPort: envVars.PRODUCTS_MS_PORT,
};
