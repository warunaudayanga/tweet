import { QueryFailedError } from "typeorm";
import { TypeOrmErrorCode } from "../enums";

export interface TypeormQueryFailedError extends QueryFailedError {
    code: TypeOrmErrorCode;
    detail: string;
}
