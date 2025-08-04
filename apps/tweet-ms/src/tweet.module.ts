import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "@tweet/core";
import { TweetController } from "./controllers";
import { TweetReplyService, TweetService } from "./services";
import { TweetReplyRepository, TweetRepository } from "./repositories";
import { TweetLikeService } from "./services/tweet-like.service";
import { TweetLikeRepository } from "./repositories/tweet-like.repository";

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig)],
    controllers: [TweetController],
    providers: [
        TweetService,
        TweetRepository,
        TweetLikeService,
        TweetLikeRepository,
        TweetReplyService,
        TweetReplyRepository,
    ],
})
export class TweetModule {}
