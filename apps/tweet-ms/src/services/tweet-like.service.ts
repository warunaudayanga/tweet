import { Injectable } from "@nestjs/common";
import { TweetLikeRepository } from "../repositories/tweet-like.repository";
import { CrudService, TweetLikeEntity } from "@tweet/core";

@Injectable()
export class TweetLikeService extends CrudService<TweetLikeEntity> {
    constructor(protected override readonly repository: TweetLikeRepository) {
        super(repository, "tweetLike", ["user"]);
    }
}
