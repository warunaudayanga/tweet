import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ClientCrudService, CreatePayload, EntityId, microservices, Service, SuccessResponse } from "@tweet/core";
import {
    CreateTweetReplyDto,
    DeleteTweetReplyPayload,
    DeleteTweetPayload,
    GetTweetRepliesPayload,
    ToggleLikePayload,
    Tweet,
    TweetLike,
    TweetReply,
    UpdateTweetDto,
    UpdateTweetPayload,
} from "@tweet/core/tweet";
import { firstValueFrom } from "rxjs";

@Injectable()
export class TweetClientService extends ClientCrudService<Tweet> {
    constructor(@Inject(microservices().tweet.name) protected override readonly client: ClientProxy) {
        super(client, Service.TWEET);
    }

    updateTweet(id: EntityId, userId: EntityId, dto: UpdateTweetDto): Promise<Tweet> {
        return firstValueFrom(
            this.client.send<Tweet, UpdateTweetPayload>(
                { cmd: microservices().tweet.commands.UPDATE_TWEET },
                { id, userId, dto },
            ),
        );
    }

    deleteTweet(id: EntityId, userId: EntityId): Promise<SuccessResponse> {
        return firstValueFrom(
            this.client.send<SuccessResponse, DeleteTweetPayload>(
                { cmd: microservices().tweet.commands.DELETE_TWEET },
                { id, userId },
            ),
        );
    }

    toggleLike(id: EntityId, userId: EntityId): Promise<TweetLike> {
        return firstValueFrom(
            this.client.send<TweetLike, ToggleLikePayload>(
                { cmd: microservices().tweet.commands.TOGGLE_TWEET_LIKE },
                { id, userId },
            ),
        );
    }

    createReply(id: EntityId, userId: EntityId, dto: CreateTweetReplyDto): Promise<TweetReply> {
        return firstValueFrom(
            this.client.send<TweetReply, CreatePayload<TweetReply>>(
                { cmd: microservices().tweet.commands.REPLY_TWEET },
                { dto: { ...dto, tweetId: id, authorId: userId } },
            ),
        );
    }

    getReplies(id: EntityId): Promise<TweetReply[]> {
        return firstValueFrom(
            this.client.send<TweetReply[], GetTweetRepliesPayload>(
                { cmd: microservices().tweet.commands.GET_TWEET_REPLIES },
                { id },
            ),
        );
    }

    deleteReply(id: EntityId, replyId: EntityId, userId: EntityId): Promise<SuccessResponse> {
        return firstValueFrom(
            this.client.send<SuccessResponse, DeleteTweetReplyPayload>(
                { cmd: microservices().tweet.commands.DELETE_TWEET_REPLY },
                { id, userId, replyId },
            ),
        );
    }
}
