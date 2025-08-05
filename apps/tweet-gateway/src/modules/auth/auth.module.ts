import { Module } from "@nestjs/common";
import { AuthService, JwtTokenService, TokenVerifyService, UserCacheService } from "./services";
import { AuthController } from "./controllers";
import { UserModule } from "../user/user.module";
import { JwtService } from "@nestjs/jwt";
import { JwtStrategy, LocalStrategy } from "./strategies";
import { EmailModule } from "@tweet/core/email";
import { CacheModule } from "@tweet/core/cache";

@Module({
    imports: [EmailModule.forRoot("assets/templates"), CacheModule, UserModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtService,
        JwtStrategy,
        JwtTokenService,
        TokenVerifyService,
        UserCacheService,
    ],
})
export class AuthModule {}
