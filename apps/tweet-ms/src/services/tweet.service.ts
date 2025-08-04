import { Injectable } from "@nestjs/common";
import { TweetRepository } from "../repositories";
import { TweetLikeService } from "./tweet-like.service";
import { TweetReplyService } from "./tweet-reply.service";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { CreateTweetReplyDto, Tweet, TweetLike, TweetReply } from "@tweet/core/tweet";
import { CrudService, EntityId, Errors, FindAllOptions, SafeFindOptions, SuccessResponse } from "@tweet/core";

@Injectable()
export class TweetService extends CrudService<Tweet> {
    constructor(
        protected override readonly repository: TweetRepository,
        private readonly tweetLikeService: TweetLikeService,
        private readonly tweetReplyService: TweetReplyService,
    ) {
        super(repository, "tweet", ["author", "replies", "likes", "likes.user", "replies.author"]);
    }

    override getAll(options: FindAllOptions<Tweet>): Promise<Tweet[]> {
        return super.getAll({ order: { createdAt: "DESC" }, ...options });
    }

    getReplies(id: EntityId): Promise<TweetReply[]> {
        return this.tweetReplyService.getMany({ where: { tweetId: id } });
    }

    createReply(id: EntityId, userId: EntityId, replyDto: CreateTweetReplyDto): Promise<TweetReply> {
        return this.tweetReplyService.create({
            ...replyDto,
            tweetId: id,
            authorId: userId,
        });
    }

    async toggleLike(id: EntityId, userId: EntityId): Promise<TweetLike> {
        const like = await this.tweetLikeService.getOne({
            where: { tweetId: id, userId },
            skipThrow: true,
        });
        if (like) {
            await this.tweetLikeService.delete(like.id);
            return like;
        }
        return this.tweetLikeService.create({ tweetId: id, userId });
    }

    async updateTweet(
        id: EntityId,
        userId: EntityId,
        updateData: QueryDeepPartialEntity<Tweet>,
        options: Omit<SafeFindOptions<Tweet>, "where"> = {},
    ): Promise<Tweet> {
        const tweet = await this.get(id);
        if (tweet.authorId !== userId) {
            throw Errors.forbidden("You are not allowed to update this tweet. Only the author can update it.");
        }

        return super.update(id, updateData, options);
    }

    async deleteTweet(id: EntityId, userId: EntityId): Promise<SuccessResponse> {
        const tweet = await this.get(id);
        if (tweet.authorId !== userId) {
            throw Errors.forbidden("You are not allowed to delete this tweet. Only the author can delete it.");
        }

        return super.delete(id);
    }

    deleteReply(id: EntityId, replyId: EntityId, userId: EntityId): Promise<SuccessResponse> {
        return this.tweetReplyService.deleteReply({ where: { tweetId: id, id: replyId } }, userId);
    }
}
