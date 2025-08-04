import { Column, Entity, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { BaseEntity } from "../base";
import { TweetEntity } from "./tweet.entity";
import { TweetReplyEntity } from "./tweet-reply.entity";
import { TweetLikeEntity } from "./tweet-like.entity";
import { User } from "../user";

@Entity("users")
export class UserEntity extends BaseEntity implements User {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ default: false })
    emailVerified: boolean;

    @OneToMany(() => TweetEntity, tweet => tweet.author)
    tweets: TweetEntity[];

    @OneToMany(() => TweetReplyEntity, tweetReply => tweetReply.author)
    tweetReplies: TweetReplyEntity[];

    @OneToMany(() => TweetLikeEntity, tweetLike => tweetLike.user)
    tweetLikes: TweetLikeEntity[];
}
