import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import { BaseRepository, TweetReplyEntity } from "@tweet/core";

export class TweetReplyRepository extends BaseRepository<TweetReplyEntity> {
    constructor(@InjectEntityManager() manager: EntityManager) {
        super(TweetReplyEntity, manager);
    }
}
