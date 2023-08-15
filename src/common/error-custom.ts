import { HttpException } from "@nestjs/common";
import { IErrorResponse } from "./custom-exceptions";
import dataSource from "typeOrm.config";


export class ErrorCustom extends HttpException {
    constructor(err: IErrorResponse) {
        super(err, err.statusCode)
    }
}
