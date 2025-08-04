import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
    ClientCrudService,
    configuration,
    CreatePayload,
    EntityId,
    mapToHttpExceptionPipe,
    ServiceName,
    SuccessResponse,
} from "@tweet/core";
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
    constructor(@Inject(configuration().ms.tweet.name) protected override readonly client: ClientProxy) {
        super(client, ServiceName.TWEET);
    }

    updateTweet(id: EntityId, userId: EntityId, dto: UpdateTweetDto): Promise<Tweet> {
        return firstValueFrom(
            this.client
                .send<
                    Tweet,
                    UpdateTweetPayload
                >({ cmd: configuration().ms.tweet.commands.UPDATE_TWEET }, { id, userId, dto })
                .pipe(mapToHttpExceptionPipe()),
        );
    }

    deleteTweet(id: EntityId, userId: EntityId): Promise<SuccessResponse> {
        return firstValueFrom(
            this.client
                .send<
                    SuccessResponse,
                    DeleteTweetPayload
                >({ cmd: configuration().ms.tweet.commands.DELETE_TWEET }, { id, userId })
                .pipe(mapToHttpExceptionPipe()),
        );
    }

    toggleLike(id: EntityId, userId: EntityId): Promise<TweetLike> {
        return firstValueFrom(
            this.client
                .send<
                    TweetLike,
                    ToggleLikePayload
                >({ cmd: configuration().ms.tweet.commands.TOGGLE_TWEET_LIKE }, { id, userId })
                .pipe(mapToHttpExceptionPipe()),
        );
    }

    createReply(id: EntityId, userId: EntityId, dto: CreateTweetReplyDto): Promise<TweetReply> {
        return firstValueFrom(
            this.client
                .send<
                    TweetReply,
                    CreatePayload<TweetReply>
                >({ cmd: configuration().ms.tweet.commands.REPLY_TWEET }, { dto: { ...dto, tweetId: id, authorId: userId } })
                .pipe(mapToHttpExceptionPipe()),
        );
    }

    getReplies(id: EntityId): Promise<TweetReply[]> {
        return firstValueFrom(
            this.client
                .send<
                    TweetReply[],
                    GetTweetRepliesPayload
                >({ cmd: configuration().ms.tweet.commands.GET_TWEET_REPLIES }, { id })
                .pipe(mapToHttpExceptionPipe()),
        );
    }

    deleteReply(id: EntityId, replyId: EntityId, userId: EntityId): Promise<SuccessResponse> {
        return firstValueFrom(
            this.client
                .send<
                    SuccessResponse,
                    DeleteTweetReplyPayload
                >({ cmd: configuration().ms.tweet.commands.DELETE_TWEET_REPLY }, { id, userId, replyId })
                .pipe(mapToHttpExceptionPipe()),
        );
    }
}
