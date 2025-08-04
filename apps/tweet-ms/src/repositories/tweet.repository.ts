import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import { BaseRepository, TweetEntity } from "@tweet/core";

export class TweetRepository extends BaseRepository<TweetEntity> {
    constructor(@InjectEntityManager() manager: EntityManager) {
        super(TweetEntity, manager);
    }
}
