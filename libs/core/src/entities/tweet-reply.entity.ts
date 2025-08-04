import { Column, Entity, ManyToOne } from "typeorm";
import { TweetEntity } from "./tweet.entity";
import { BaseEntity } from "../base";
import { TweetReply } from "../tweet/interfaces";
import { UserEntity } from "./user.entity";
import { EntityId } from "../types";

@Entity("tweet-replies")
export class TweetReplyEntity extends BaseEntity implements TweetReply {
    @Column()
    content: string;

    @ManyToOne(() => UserEntity, user => user.tweets, { onDelete: "CASCADE" })
    author: UserEntity;

    @Column({ nullable: true })
    authorId: EntityId | null;

    @ManyToOne(() => TweetEntity, tweet => tweet.replies, { onDelete: "CASCADE" })
    tweet: TweetEntity | null;

    @Column({ nullable: true })
    tweetId: EntityId | null;
}
