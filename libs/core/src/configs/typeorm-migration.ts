// noinspection JSUnusedGlobalSymbols

import { DataSource } from "typeorm";
import { configuration } from "./configuration";
import { TweetEntity, TweetLikeEntity, TweetReplyEntity, UserEntity } from "../entities";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export default new DataSource({
    type: configuration().database.type,
    host: configuration().database.host,
    port: configuration().database.port,
    username: configuration().database.user,
    password: configuration().database.password,
    database: configuration().database.database,
    schema: configuration().database.schema,
    synchronize: false,
    logging: configuration().database.logging,
    entities: [UserEntity, TweetEntity, TweetLikeEntity, TweetReplyEntity],
    migrations: ["migrations/*{.ts,.js}"],
    namingStrategy: new SnakeNamingStrategy(),
});
