import { Controller } from "@nestjs/common";
import { TweetService } from "../services";
import { MessagePattern } from "@nestjs/microservices";
import {
    configuration,
    CreatePayload,
    GetAllPayload,
    GetManyPayload,
    GetPayload,
    ServiceName,
    SuccessResponse,
} from "@tweet/core";
import {
    DeleteTweetReplyPayload,
    DeleteTweetPayload,
    GetTweetRepliesPayload,
    ReplyTweetPayload,
    ToggleLikePayload,
    Tweet,
    TweetLike,
    TweetReply,
    UpdateTweetPayload,
} from "@tweet/core/tweet";

@Controller()
export class TweetController {
    constructor(private readonly tweetService: TweetService) {}

    @MessagePattern({ cmd: configuration().ms.commands(ServiceName.TWEET).GET })
    get({ id }: GetPayload<Tweet>): Promise<Tweet> {
        return this.tweetService.get(id);
    }

    @MessagePattern({ cmd: configuration().ms.commands(ServiceName.TWEET).GET_MANY })
    getMany({ options }: GetManyPayload<Tweet>): Promise<Tweet[]> {
        return this.tweetService.getMany(options);
    }

    @MessagePattern({ cmd: configuration().ms.commands(ServiceName.TWEET).GET_ALL })
    getAll({ options }: GetAllPayload<Tweet>): Promise<Tweet[]> {
        return this.tweetService.getAll(options);
    }

    @MessagePattern({ cmd: configuration().ms.commands(ServiceName.TWEET).CREATE })
    create({ dto }: CreatePayload<Tweet>): Promise<Tweet> {
        return this.tweetService.create(dto);
    }

    @MessagePattern({ cmd: configuration().ms.tweet.commands.UPDATE_TWEET })
    updateTweet({ id, userId, dto }: UpdateTweetPayload): Promise<Tweet> {
        return this.tweetService.updateTweet(id, userId, dto);
    }

    @MessagePattern({ cmd: configuration().ms.tweet.commands.DELETE_TWEET })
    deleteTweet({ id, userId }: DeleteTweetPayload): Promise<SuccessResponse> {
        return this.tweetService.deleteTweet(id, userId);
    }

    @MessagePattern({ cmd: configuration().ms.tweet.commands.TOGGLE_TWEET_LIKE })
    toggleLike({ id, userId }: ToggleLikePayload): Promise<TweetLike> {
        return this.tweetService.toggleLike(id, userId);
    }

    @MessagePattern({ cmd: configuration().ms.tweet.commands.REPLY_TWEET })
    replyToTweet({ id, userId, dto }: ReplyTweetPayload): Promise<TweetReply> {
        return this.tweetService.createReply(id, userId, dto);
    }

    @MessagePattern({ cmd: configuration().ms.tweet.commands.GET_TWEET_REPLIES })
    getReplies({ id }: GetTweetRepliesPayload): Promise<TweetReply[]> {
        return this.tweetService.getReplies(id);
    }

    @MessagePattern({ cmd: configuration().ms.tweet.commands.DELETE_TWEET_REPLY })
    deleteReply({ id, replyId, userId }: DeleteTweetReplyPayload): Promise<SuccessResponse> {
        return this.tweetService.deleteReply(id, replyId, userId);
    }
}
