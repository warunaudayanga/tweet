import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/user/user.module";
import { TweetModule } from "./modules/tweet/tweet.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
    imports: [AuthModule, UserModule, TweetModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
