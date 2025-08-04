// noinspection JSIgnoredPromiseFromCall

import { NestFactory } from "@nestjs/core";
import { UserModule } from "./user.module";
import { MicroserviceOptions } from "@nestjs/microservices";
import { microservices } from "@tweet/core";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, microservices().user);

    await app.listen();
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
