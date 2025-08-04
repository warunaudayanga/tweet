import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import { BaseRepository, TweetLikeEntity } from "@tweet/core";

export class TweetLikeRepository extends BaseRepository<TweetLikeEntity> {
    constructor(@InjectEntityManager() manager: EntityManager) {
        super(TweetLikeEntity, manager);
    }
}
