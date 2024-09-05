import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { NotFoundError } from "../../../domain/errors/not-found-error";
import { FastifyReply } from "fastify";

@Catch()
export class NotFoundErrorFilter implements ExceptionFilter {
    catch(exception: NotFoundError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();

        response.status(409).send({
            statusCode: 404,
            error: "Not Found",
            message: exception.message,
        });
    }
}
