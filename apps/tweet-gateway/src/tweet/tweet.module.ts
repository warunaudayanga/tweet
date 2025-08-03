import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { microservices } from "@tweet/config";
import { TweetController } from "./tweet.controller";
import { TweetClientService } from "./tweet-client.service";

@Module({
    imports: [ClientsModule.register([microservices().tweet])],
    controllers: [TweetController],
    providers: [TweetClientService],
})
export class TweetModule {}
