import { AccessToken, RefreshToken } from "@tweet/core";

export interface UserSession {
    sessionId: string;
    accessToken: AccessToken;
    refreshToken: RefreshToken;
    frontendUrl?: string;
}
