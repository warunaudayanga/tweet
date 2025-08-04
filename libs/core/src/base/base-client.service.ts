// noinspection JSUnusedGlobalSymbols,ExceptionCaughtLocallyJS

import { DeepPartial } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { BaseModel } from "./base.model";
import { SuccessResponse } from "../responses";
import { FindAllOptions, SafeFindManyOptions, SafeFindOptions } from "../interfaces";
import { EntityId } from "../types";
import { firstValueFrom } from "rxjs";
import { ClientProxy } from "@nestjs/microservices";
import { configuration } from "../configs";
import {
    CreatePayload,
    DeleteOnePayload,
    DeletePayload,
    GetAllPayload,
    GetManyPayload,
    GetOnePayload,
    GetPayload,
    UpdatePayload,
} from "./base.payloads";
import { ServiceName } from "../enums";
import { mapToHttpExceptionPipe } from "../utils";

export abstract class ClientCrudService<Model extends BaseModel> {
    protected constructor(
        protected readonly client: ClientProxy,
        private readonly service: ServiceName,
    ) {}

    async create(dto: DeepPartial<Model>, options: Omit<SafeFindOptions<Model>, "where"> = {}): Promise<Model> {
        return await firstValueFrom(
            this.client
                .send<
                    Model,
                    CreatePayload<Model>
                >({ cmd: configuration().ms.commands(this.service).CREATE }, { dto, options })
                .pipe(mapToHttpExceptionPipe()),
        );
    }

    get(id: EntityId, options: Omit<SafeFindOptions<Model>, "where"> = {}): Promise<Model> {
        return firstValueFrom(
            this.client
                .send<Model, GetPayload<Model>>({ cmd: configuration().ms.commands(this.service).GET }, { id, options })
                .pipe(mapToHttpExceptionPipe()),
        );
    }

    getOne(options: SafeFindOptions<Model>, field?: string): Promise<Model>;

    getOne(options: SafeFindOptions<Model> & { skipThrow: true }, field?: string): Promise<Model | null>;

    getOne(options: SafeFindOptions<Model> & { skipThrow?: true }, field?: string): Promise<Model | null> {
        return firstValueFrom(
            this.client
                .send<
                    Model,
                    GetOnePayload<Model>
                >({ cmd: configuration().ms.commands(this.service).GET_ONE }, { options, field })
                .pipe(mapToHttpExceptionPipe()),
        );
    }

    getMany(options: SafeFindManyOptions<Model> = {}): Promise<Model[]> {
        return firstValueFrom(
            this.client
                .send<
                    Model[],
                    GetManyPayload<Model>
                >({ cmd: configuration().ms.commands(this.service).GET_MANY }, { options })
                .pipe(mapToHttpExceptionPipe()),
        );
    }

    getAll(options: FindAllOptions<Model> = {}): Promise<Model[]> {
        return firstValueFrom(
            this.client
                .send<
                    Model[],
                    GetAllPayload<Model>
                >({ cmd: configuration().ms.commands(this.service).GET_ALL }, { options })
                .pipe(mapToHttpExceptionPipe()),
        );
    }

    update(
        id: EntityId,
        dto: QueryDeepPartialEntity<Model>,
        options: Omit<SafeFindOptions<Model>, "where"> = {},
    ): Promise<Model> {
        return firstValueFrom(
            this.client
                .send<
                    Model,
                    UpdatePayload<Model>
                >({ cmd: configuration().ms.commands(this.service).UPDATE }, { id, dto, options })
                .pipe(mapToHttpExceptionPipe()),
        );
    }

    delete(id: EntityId): Promise<SuccessResponse> {
        return firstValueFrom(
            this.client
                .send<
                    SuccessResponse,
                    DeletePayload<Model>
                >({ cmd: configuration().ms.commands(this.service).DELETE }, { id })
                .pipe(mapToHttpExceptionPipe()),
        );
    }

    deleteOne(options: SafeFindOptions<Model>): Promise<SuccessResponse> {
        return firstValueFrom(
            this.client
                .send<
                    SuccessResponse,
                    DeleteOnePayload<Model>
                >({ cmd: configuration().ms.commands(this.service).DELETE_ONE }, { options })
                .pipe(mapToHttpExceptionPipe()),
        );
    }
}
