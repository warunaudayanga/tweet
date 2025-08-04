import { BaseModel } from "../../base";
import { EntityId } from "../../types";
import { User } from "../../user";

export interface TweetLike extends BaseModel {
    tweet: Tweet | null;
    tweetId: EntityId | null;
    user: User | null;
    userId: EntityId | null;
}

export interface TweetReply extends BaseModel {
    content: string;
    author: User | null;
    authorId: EntityId | null;
    tweet: Tweet | null;
    tweetId: EntityId | null;
}

export interface Tweet extends BaseModel {
    content: string;
    author: User | null;
    authorId: EntityId | null;
    likes: TweetLike[] | null;
    replies: TweetReply[] | null;
}
