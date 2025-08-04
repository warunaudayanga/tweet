import { EntityId } from "../../types";
import { UpdateUserDto } from "../dtos";

export interface UpdateUserPayload {
    id: EntityId;
    userId: EntityId;
    dto: UpdateUserDto;
}
