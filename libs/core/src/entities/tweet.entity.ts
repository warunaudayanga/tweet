import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { TweetReplyEntity } from "./tweet-reply.entity";
import { TweetLikeEntity } from "./tweet-like.entity";
import { Tweet } from "../tweet/interfaces";
import { BaseEntity } from "../base";
import { UserEntity } from "./user.entity";
import { EntityId } from "../types";

@Entity("tweets")
export class TweetEntity extends BaseEntity implements Tweet {
    @Column()
    content: string;

    @ManyToOne(() => UserEntity, user => user.tweets, { onDelete: "CASCADE" })
    author: UserEntity | null;

    @Column({ nullable: true })
    authorId: EntityId | null;

    @OneToMany(() => TweetLikeEntity, tweet => tweet.tweet)
    likes: TweetLikeEntity[] | null;

    @OneToMany(() => TweetReplyEntity, tweet => tweet.tweet)
    replies: TweetReplyEntity[] | null;
}
