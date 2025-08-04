import { IsJWT, IsNotEmpty } from "class-validator";
import { RefreshToken } from "@tweet/core";

export class RefreshTokenDto {
    @IsJWT()
    @IsNotEmpty()
    refreshToken: RefreshToken;
}
