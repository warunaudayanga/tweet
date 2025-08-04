import { Column, Entity, ManyToOne } from "typeorm";
import { TweetEntity } from "./tweet.entity";
import { Tweet, TweetLike } from "../tweet/interfaces";
import { BaseEntity } from "../base";
import { EntityId } from "../types";
import { UserEntity } from "./user.entity";

@Entity("tweet-likes")
export class TweetLikeEntity extends BaseEntity implements TweetLike {
    @ManyToOne(() => TweetEntity, tweet => tweet.likes, { onDelete: "CASCADE" })
    tweet: Tweet | null;

    @Column({ nullable: true })
    tweetId: EntityId | null;

    @ManyToOne(() => UserEntity, user => user.tweets, { onDelete: "CASCADE" })
    user: UserEntity | null;

    @Column({ nullable: true })
    userId: EntityId | null;
}
