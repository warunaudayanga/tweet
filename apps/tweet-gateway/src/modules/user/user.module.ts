import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { UserController } from "./user.controller";
import { UserClientService } from "./user-client.service";
import { configuration } from "@tweet/core";

@Module({
    imports: [ClientsModule.register([configuration().ms.user])],
    controllers: [UserController],
    providers: [UserClientService],
    exports: [UserClientService],
})
export class UserModule {}
