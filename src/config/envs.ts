import 'dotenv/config';
import * as joi from 'joi';

//* 1. Define the shape of the environment variables
interface IEnvVars {
  PORT: number;
  NATS_SERVERS: string[];
}

//* 2. Validate the environment variables
const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true); // Allow unknown properties

const { error, value } = envVarsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: \${error.message}`);
}

const envVars: IEnvVars = value;

//* 3. Export the environment variables
export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
};
