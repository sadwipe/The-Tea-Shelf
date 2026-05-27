import 'dotenv/config';

export default {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.USER_PASSWORD,
  port: process.env.DB_PORT,
};
