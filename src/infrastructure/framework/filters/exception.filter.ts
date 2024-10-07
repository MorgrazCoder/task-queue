import { BaseException } from "@infrastructure/exceptions";
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";

@Catch(BaseException)
export class CustomExceptionsFilter implements ExceptionFilter<BaseException> {
    catch(exception: BaseException, host: ArgumentsHost) {
        const hst = host.switchToHttp();
        const res = hst.getResponse<Response>();

        res.status(exception.status).json({
            status: exception.status,
            message: exception.message,
        });
    }
}
