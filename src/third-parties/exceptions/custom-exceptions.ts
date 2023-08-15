import {
    Catch,
    ExceptionFilter,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorCustom } from '../../common/error-custom';

@Catch(ErrorCustom)
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: ErrorCustom, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const { statusCode, code, message } = exception.getResponse() as {
            statusCode: number;
            code: string;
            message: string;
        };

        response.status(statusCode).json({
            statusCode,
            code,
            message,
        });
    }
}
