// noinspection JSIgnoredPromiseFromCall

import { BadRequestException, ClassSerializerInterceptor, Logger, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./filters";
import { ValidationError } from "class-validator";
import { configuration, Errors, generateValidationErrorResponse } from "@tweet/core";

export function isOriginAllowed(origin: string, allowedOrigins: string[]): boolean {
    return allowedOrigins.some(allowedOrigin => {
        if (allowedOrigin.includes("*")) {
            const regex = new RegExp(`^${allowedOrigin.replace(/\./g, "\\.").replace("*", ".*")}$`);
            return regex.test(origin);
        }
        return allowedOrigin === origin;
    });
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            stopAtFirstError: true,
            exceptionFactory: (errors: ValidationError[]): BadRequestException => {
                return new BadRequestException(generateValidationErrorResponse(errors[0]));
            },
        }),
    );

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    // noinspection JSUnusedGlobalSymbols
    app.enableCors({
        origin: (origin: string, callback: (ex: Error | null, allow?: boolean) => void) => {
            if (!origin || isOriginAllowed(origin, configuration().app.allowedOrigins)) {
                callback(null, true);
            } else {
                callback(Errors.unauthorized("Invalid origin. Please check the CORS configuration."));
            }
        },
        credentials: true,
    });

    await app.listen(configuration().app.port);
    Logger.log(`🚀 Application is running on: http://localhost:${configuration().app.port}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
