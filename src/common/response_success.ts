import { BaseResponse } from "./custom-exceptions";


export class CustomResponse {
    constructor(res: BaseResponse, data?: any) {
        this.statusCode = res.statusCode
        this.message = res.message
        this.data = data
    }
    statusCode: number;
    message: string;
    data?: any
}