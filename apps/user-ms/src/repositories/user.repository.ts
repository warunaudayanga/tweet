import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import { BaseRepository, UserEntity } from "@tweet/core";

export class UserRepository extends BaseRepository<UserEntity> {
    constructor(@InjectEntityManager() manager: EntityManager) {
        super(UserEntity, manager);
    }
}
