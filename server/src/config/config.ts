import { cleanEnv, str, port } from "envalid";
import dotenv from "dotenv";

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port({ default: 8080 }),
  MONGO_URL: str(),
  JWT_SECRET: str(),
  JWT_REFRESH_TOKEN_SECRET: str(),
  JWT_EXPIRES_IN: str({ default: "15m" }),
  JWT_REFRESH_TOKEN_EXPIRES_IN: str({ default: "7d" }),
  EMAIL_USERNAME: str(),
  EMAIL_PASSWORD: str(),
});

export default env;
