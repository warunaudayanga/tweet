import { IsNotEmpty } from "class-validator";
import { VerifyToken } from "@tweet/core";

export class ResetPasswordDto {
    @IsNotEmpty()
    token: VerifyToken;

    @IsNotEmpty()
    password: string;
}
