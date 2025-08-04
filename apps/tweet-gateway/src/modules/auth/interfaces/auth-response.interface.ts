import { User } from "@tweet/core/user";
import { AccessToken, RefreshToken } from "@tweet/core";

export interface Tokens {
    accessToken: AccessToken;
    refreshToken: RefreshToken;
}

export interface TokenResponse extends Tokens {
    accessTokenExpiresOn: Date;
    refreshTokenExpiresOn: Date;
}

export interface AuthResponse extends TokenResponse {
    user: User;
}
