import { cleanEnv, str } from 'envalid';

export const env = cleanEnv(process.env, {
  API_URL: str({
    default: 'http://localhost:5000/graphql',
  }),
});
