import { QueryFailedError } from "typeorm";
import { ExceptionLikeObject, TypeormQueryFailedError } from "../interfaces";
import { catchError, Observable, throwError, UnaryFunction } from "rxjs";
import { HttpException } from "@nestjs/common";

export const isQueryFailedError = (error: unknown): error is TypeormQueryFailedError => {
    return error instanceof QueryFailedError;
};

export const isExceptionLikeObject = (error: unknown): error is ExceptionLikeObject => {
    return Boolean(
        (error as ExceptionLikeObject).response &&
            (error as ExceptionLikeObject).status &&
            (error as ExceptionLikeObject).name &&
            (error as ExceptionLikeObject).message,
    );
};

export function mapToHttpExceptionPipe<T>(): UnaryFunction<Observable<T>, Observable<T>> {
    return catchError((e: unknown) =>
        isExceptionLikeObject(e) ? throwError(() => new HttpException(e.response, e.status)) : throwError(() => e),
    );
}
