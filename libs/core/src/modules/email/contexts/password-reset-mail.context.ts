import { MailContext } from "./mail.context";
import { VerifyToken } from "../../../types";

export interface PasswordResetMailContext extends MailContext {
    token: VerifyToken;
    expiryTime: number;
}
