import { Controller } from "@nestjs/common";
import { UserService } from "../services";
import { MessagePattern } from "@nestjs/microservices";
import {
    configuration,
    CreatePayload,
    GetAllPayload,
    GetOnePayload,
    GetPayload,
    ServiceName,
    SuccessResponse,
    UpdatePayload,
} from "@tweet/core";
import { DeleteUserPayload, UpdateUserPayload, User } from "@tweet/core/user";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern({ cmd: configuration().ms.commands(ServiceName.USER).GET })
    get({ id, options }: GetPayload<User>): Promise<User> {
        return this.userService.get(id, options);
    }

    @MessagePattern({ cmd: configuration().ms.commands(ServiceName.USER).GET_ONE })
    getOne({ options, field }: GetOnePayload<User>): Promise<User> {
        return this.userService.getOne(options, field);
    }

    @MessagePattern({ cmd: configuration().ms.commands(ServiceName.USER).GET_ALL })
    getAll({ options }: GetAllPayload<User>): Promise<User[]> {
        return this.userService.getAll(options);
    }

    @MessagePattern({ cmd: configuration().ms.commands(ServiceName.USER).CREATE })
    create({ dto }: CreatePayload<User>): Promise<User> {
        return this.userService.create(dto);
    }

    @MessagePattern({ cmd: configuration().ms.commands(ServiceName.USER).UPDATE })
    update({ id, dto, options }: UpdatePayload<User>): Promise<User> {
        return this.userService.update(id, dto, options);
    }

    @MessagePattern({ cmd: configuration().ms.user.commands.UPDATE_USER })
    updateUser({ id, dto, userId }: UpdateUserPayload): Promise<User> {
        return this.userService.updateUser(id, dto, userId);
    }

    @MessagePattern({ cmd: configuration().ms.user.commands.DELETE_USER })
    deleteUser({ id, userId }: DeleteUserPayload): Promise<SuccessResponse> {
        return this.userService.deleteUser(id, userId);
    }
}
