// noinspection JSUnusedGlobalSymbols

import { DeepPartial } from "typeorm";
import { FindAllOptions, SafeFindManyOptions, SafeFindOptions } from "../interfaces";
import { EntityId } from "../types";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface CreatePayload<Model> {
    dto: DeepPartial<Model>;
    options?: Omit<SafeFindOptions<Model>, "where">;
}

export interface GetPayload<Model> {
    id: EntityId;
    options: Omit<SafeFindOptions<Model>, "where">;
}

export interface GetOneOrThrowPayload<Model> {
    options: SafeFindOptions<Model> & { skipThrow?: false };
    field?: string;
}

export interface GetOneSkipThrowPayload<Model> {
    options: SafeFindOptions<Model> & { skipThrow: true };
    field?: string;
}

export interface GetOnePayload<Model> {
    options: SafeFindOptions<Model> & { skipThrow?: boolean };
    field?: string;
}

export interface GetManyPayload<Model> {
    options: SafeFindManyOptions<Model>;
}

export interface GetAllPayload<Model> {
    options: FindAllOptions<Model>;
}

export interface UpdatePayload<Model> {
    id: EntityId;
    dto: QueryDeepPartialEntity<Model>;
    options: Omit<SafeFindOptions<Model>, "where">;
}

export interface DeletePayload<Model> {
    id: EntityId;
}

export interface DeleteOnePayload<Model> {
    options: SafeFindOptions<Model>;
}
