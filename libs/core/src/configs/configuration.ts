// noinspection JSUnusedGlobalSymbols

import * as dotenv from "dotenv";
import * as process from "node:process";

dotenv.config();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const configuration = () => ({
    app: {
        port: Number(process.env.PORT || process.env.APP_PORT) || 3000,
        allowedOrigins: String(process.env.APP_ALLOWED_ORIGINS).split(",") || [],
        environment: process.env.NODE_ENV || "development",
        emailVerifyRedirectUrl: `${process.env.APP_WEB_URL}/${process.env.APP_EMAIL_VERIFY_REDIRECT_PATH}`,
        passwordResetUrl: `${process.env.APP_WEB_URL}/${process.env.APP_PASSWORD_RESET_PATH}`,
    },
    session: {
        secret: process.env.SESSION_SECRET,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: Number(process.env.JWT_EXP || 60 * 60 * 24),
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        refreshExpiresIn: Number(process.env.JWT_REFRESH_EXP || 60 * 60 * 24 * 30),
    },
    redis: {
        url: process.env.REDIS_URL || "redis://localhost:6379",
        prefix: process.env.REDIS_PREFIX || "",
        ttl: Number(process.env.REDIS_CACHE_TTL) || 7890000,
        lruSize: Number(process.env.REDIS_CACHE_TTL) || 7890000,
    },
    database: {
        type: "postgres" as const,
        host: process.env.DATABASE_HOST || "localhost",
        port: Number(process.env.DATABASE_PORT || 5432),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        schema: process.env.DATABASE_SCHEMA,
        synchronize: process.env.DATABASE_SYNC === "true",
        logging: process.env.DATABASE_LOGGING === "true",
        ssl: process.env.DATABASE_SSL === "true",
        sslMode: process.env.DATABASE_SSL_MODE || "require",
    },
    smtp: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        secure: process.env.SMTP_SECURE === "true",
        ignoreTLS: !(process.env.SMTP_SECURE === "true"),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        from: process.env.SMTP_FROM,
    },
    regex: {
        email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    },
    ms: {
        gateway: {
            host: process.env.MS_GATEWAY_HOST || "localhost",
            port: Number(process.env.MS_GATEWAY_PORT || 3000),
        },
        user: {
            host: process.env.MS_USER_HOST || "localhost",
            port: Number(process.env.MS_USER_PORT || 3001),
        },
        tweet: {
            host: process.env.MS_TWEET_HOST || "localhost",
            port: Number(process.env.MS_TWEET_PORT || 3002),
        },
    },
});
// # sourceMappingURL=configuration.js.map
