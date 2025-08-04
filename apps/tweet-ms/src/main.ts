// noinspection JSIgnoredPromiseFromCall

import { NestFactory } from "@nestjs/core";
import { TweetModule } from "./tweet.module";
import { MicroserviceOptions } from "@nestjs/microservices";
import { configuration } from "@tweet/core";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(TweetModule, configuration().ms.tweet);
    await app.listen();
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
