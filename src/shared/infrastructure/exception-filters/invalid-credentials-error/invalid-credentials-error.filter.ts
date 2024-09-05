import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { InvalidCredentialsError } from "../../../application/errors/invalid-credentials-error";
import { FastifyReply } from "fastify";

@Catch()
export class InvalidCredentialsErrorFilter implements ExceptionFilter {
    catch(exception: InvalidCredentialsError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();

        response.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            message: exception.message,
        });
    }
}
