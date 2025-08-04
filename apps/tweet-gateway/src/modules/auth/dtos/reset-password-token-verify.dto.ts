import { IsNotEmpty } from "class-validator";
import { VerifyToken } from "@tweet/core";

export class ResetPasswordTokenVerifyDto {
    @IsNotEmpty()
    token: VerifyToken;
}
