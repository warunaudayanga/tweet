import { EntityId } from "../../types";

export interface DeleteUserPayload {
    id: EntityId;
    userId: EntityId;
}
