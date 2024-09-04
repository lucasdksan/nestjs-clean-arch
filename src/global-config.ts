import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { WrapperDataInterceptor } from "./shared/infrastructure/interceptors/wrapper-data/wrapper-data.interceptor";

function applayGlobalConfig(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe({
        errorHttpStatusCode: 422,
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(
        new WrapperDataInterceptor(),
        new ClassSerializerInterceptor(app.get(Reflector))
    );
}

export default applayGlobalConfig;
