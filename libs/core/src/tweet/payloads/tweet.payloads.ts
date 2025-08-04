import { EntityId } from "../../types";
import { CreateTweetReplyDto, UpdateTweetDto } from "../dtos";

export interface UpdateTweetPayload {
    id: EntityId;
    userId: EntityId;
    dto: UpdateTweetDto;
}

export interface DeleteTweetPayload {
    id: EntityId;
    userId: EntityId;
}

export interface ToggleLikePayload {
    id: EntityId;
    userId: EntityId;
}

export interface ReplyTweetPayload {
    id: EntityId;
    userId: EntityId;
    dto: CreateTweetReplyDto;
}

export interface GetTweetRepliesPayload {
    id: EntityId;
}

export interface DeleteTweetReplyPayload {
    id: EntityId;
    replyId: EntityId;
    userId: EntityId;
}
