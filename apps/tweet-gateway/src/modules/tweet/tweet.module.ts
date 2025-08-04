import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { TweetController } from "./tweet.controller";
import { TweetClientService } from "./tweet-client.service";
import { configuration } from "@tweet/core";

@Module({
    imports: [ClientsModule.register([configuration().ms.tweet])],
    controllers: [TweetController],
    providers: [TweetClientService],
})
export class TweetModule {}
