import { Sha256Helper } from '../common/helpers/sha256.helper';

const sha256Helper = new Sha256Helper();

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = sha256Helper.hash(jwtSecret + '-refresh');
const jwtAcessSecret = sha256Helper.hash(jwtSecret + '-auth');

const cookieNamePrefix = process.env.COOKIE_NAME_PREFIX;

export default () => {
  return {
    port: parseInt(process.env.PORT || '4000', 10),
    corsOrigin: String(process.env.CORS_ORIGIN).split(','),
    nodeEnv: process.env.NODE_ENV,
    isDev: process.env.NODE_ENV == 'development',
    cookie: {
      domain: process.env.COOKIE_DOMAIN,
      secure: process.env.COOKIE_SECURE === 'true',
      expiresIn: process.env.COOKIE_EXPIRATION,
      secret: process.env.COOKIE_SECRET,
    },
    jwt: {
      refresh: {
        secret: jwtRefreshSecret,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        cookieName: `${cookieNamePrefix}_refresh_token`,
      },
      access: {
        secret: jwtAcessSecret,
        expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        cookieName: `${cookieNamePrefix}_access_token`,
      },
    },
    postgres: {
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      db: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      url: process.env.DATABASE_URL,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6381', 10),
      password: process.env.REDIS_PASSWORD || '',
      db: parseInt(process.env.REDIS_DB || '0', 10),
    },
    minio: {
      rootUser: process.env.MINIO_ROOT_USER,
      rootPassword: process.env.MINIO_ROOT_PASSWORD,
      port: parseInt(process.env.MINIO_PORT || '9000', 10),
    },
  };
};
