import { NestFactory } from "@nestjs/core";
import {
    FastifyAdapter,
    NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import applyGlobalConfig from "./global-config";

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );
    const config = new DocumentBuilder()
        .setTitle("Curso Node Js")
        .setDescription("Curso Completo sobre Node Js + Nest js + Clean Arch + DDD")
        .setVersion("1.0.0")
        .addBearerAuth({
            description: "Informar o JWT para autorizar o acesso",
            name: "Authorization",
            scheme: "Bearer",
            type: "http",
            in: "Header",
        }).build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    applyGlobalConfig(app);
    await app.listen(3000, "0.0.0.0");
}

bootstrap();
