// noinspection JSIgnoredPromiseFromCall

import { NestFactory } from "@nestjs/core";
import { TweetModule } from "./tweet.module";
import { MicroserviceOptions } from "@nestjs/microservices";
import { microservices } from "@tweet/config";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(TweetModule, microservices().tweet);
    await app.listen();
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
