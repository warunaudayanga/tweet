// noinspection JSUnusedGlobalSymbols

import { HttpStatus } from "@nestjs/common";

export interface ErrorResponse {
    statusCode: HttpStatus;
    code: string;
    message: string;
}

export interface ExceptionLikeObject {
    response: ErrorResponse;
    status: HttpStatus;
    options: unknown;
    message: string;
    name: string;
}
