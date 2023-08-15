import { HttpException } from "@nestjs/common";
import { IErrorResponse } from "./custom-exceptions";
import dataSource from "typeOrm.config";


export class ErrorCustom extends HttpException {
    constructor(err: IErrorResponse) {
        super(err, err.statusCode)

        // this.code = err.code
        // this.message = err.message
        // this.statusCode = err.statusCode
    }
    //     statusCode: number;
    //     code: string;
    //     message: string;
}
