import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { UserController } from "./user.controller";
import { UserClientService } from "./user-client.service";
import { microservices } from "@tweet/core";

@Module({
    imports: [ClientsModule.register([microservices().user])],
    controllers: [UserController],
    providers: [UserClientService],
    exports: [UserClientService],
})
export class UserModule {}
