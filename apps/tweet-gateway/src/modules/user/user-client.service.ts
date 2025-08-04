import { ClientProxy } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { ClientCrudService, configuration, EntityId, ServiceName, SuccessResponse } from "@tweet/core";
import { DeleteUserPayload, UpdateUserDto, UpdateUserPayload, User } from "@tweet/core/user";

@Injectable()
export class UserClientService extends ClientCrudService<User> {
    constructor(@Inject(configuration().ms.user.name) protected override readonly client: ClientProxy) {
        super(client, ServiceName.USER);
    }

    updateUser(id: EntityId, dto: UpdateUserDto, userId: EntityId): Promise<User> {
        return firstValueFrom(
            this.client.send<User, UpdateUserPayload>(
                { cmd: configuration().ms.user.commands.UPDATE_USER },
                { id, userId, dto },
            ),
        );
    }

    deleteUser(id: EntityId, userId: EntityId): Promise<SuccessResponse> {
        return firstValueFrom(
            this.client.send<SuccessResponse, DeleteUserPayload>(
                { cmd: configuration().ms.user.commands.DELETE_USER },
                { id, userId },
            ),
        );
    }
}
