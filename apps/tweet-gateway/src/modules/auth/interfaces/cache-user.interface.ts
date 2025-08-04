import { User } from "@tweet/core/user";
import { UserSession } from "./user-session.interface";

export interface CacheUser extends User {
    sessions: UserSession[];
}
