import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { TweetController } from "./tweet.controller";
import { TweetClientService } from "./tweet-client.service";
import { microservices } from "@tweet/core";

@Module({
    imports: [ClientsModule.register([microservices().tweet])],
    controllers: [TweetController],
    providers: [TweetClientService],
})
export class TweetModule {}
