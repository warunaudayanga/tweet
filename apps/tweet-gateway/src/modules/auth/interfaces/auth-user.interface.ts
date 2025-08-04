import { UserSession } from "./index";
import { User } from "@tweet/core/user";

export interface AuthUser extends User, UserSession {}
