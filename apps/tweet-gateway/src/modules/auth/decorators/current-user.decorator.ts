import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { User } from "@tweet/core/user";
import { AuthUser } from "../interfaces";

export function CurrentUser(): ParameterDecorator {
    return createParamDecorator((_data: unknown, ctx: ExecutionContext): AuthUser | undefined => {
        const request = ctx.switchToHttp().getRequest<Request & { user?: User & AuthUser }>();
        const user = request.user;
        if (user) user.password = undefined as unknown as string;

        return user;
    })();
}
