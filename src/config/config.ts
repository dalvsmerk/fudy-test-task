export default () => ({
  port: parseInt(process.env.PORT, 10),
  database: {
    provider: 'postgres',
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    pool: { min: 2, max: 10 },
  },
  jwtSecret: process.env.JWT_SECRET,
});
