export default () => {
  return {
    nodeEnv: process.env.NODE_ENV || 'production',
    isDev: process.env.NODE_ENV == 'development',
    port: parseInt(process.env.PORT || '5000', 10),
    postgres: {
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      db: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      url: process.env.DATABASE_URL,
    },
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6381', 10),
      password: process.env.REDIS_PASSWORD || '',
      db: parseInt(process.env.REDIS_DB || '0', 10),
    },
  };
};
