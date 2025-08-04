import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "@tweet/core";
import { UserController } from "./controllers";
import { UserService } from "./services";
import { UserRepository } from "./repositories";

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig)],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})
export class UserModule {}
