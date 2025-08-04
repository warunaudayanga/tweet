import { Injectable } from "@nestjs/common";
import { TweetReplyRepository } from "../repositories";
import { CrudService, EntityId, Errors, SafeFindOptions, SuccessResponse } from "@tweet/core";
import { TweetReply } from "@tweet/core/tweet";

@Injectable()
export class TweetReplyService extends CrudService<TweetReply> {
    constructor(protected override readonly repository: TweetReplyRepository) {
        super(repository, "tweetReply", ["author"]);
    }

    async deleteReply(options: SafeFindOptions<TweetReply>, userId: EntityId): Promise<SuccessResponse> {
        const reply = await this.getOne(options);
        if (reply.authorId !== userId) {
            throw Errors.forbidden("You are not allowed to delete this reply. Only the author can delete it.");
        }

        return super.deleteOne(options);
    }
}
