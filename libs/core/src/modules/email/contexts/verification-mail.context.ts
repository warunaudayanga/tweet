import { MailContext } from "./mail.context";
import { VerifyToken } from "../../../types";

export interface VerificationMailContext extends MailContext {
    token: VerifyToken;
}
