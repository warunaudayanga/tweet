import { ClientProxy } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { ClientCrudService, EntityId, microservices, Service, SuccessResponse } from "@tweet/core";
import { DeleteUserPayload, UpdateUserDto, UpdateUserPayload, User } from "@tweet/core/user";

@Injectable()
export class UserClientService extends ClientCrudService<User> {
    constructor(@Inject(microservices().user.name) protected override readonly client: ClientProxy) {
        super(client, Service.USER);
    }

    updateUser(id: EntityId, dto: UpdateUserDto, userId: EntityId): Promise<User> {
        return firstValueFrom(
            this.client.send<User, UpdateUserPayload>(
                { cmd: microservices().user.commands.UPDATE_USER },
                { id, userId, dto },
            ),
        );
    }

    deleteUser(id: EntityId, userId: EntityId): Promise<SuccessResponse> {
        return firstValueFrom(
            this.client.send<SuccessResponse, DeleteUserPayload>(
                { cmd: microservices().user.commands.DELETE_USER },
                { id, userId },
            ),
        );
    }
}
