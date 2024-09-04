import { NestFactory } from "@nestjs/core";
import {
    FastifyAdapter,
    NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import applayGlobalConfig from "./global-config";

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );
    applayGlobalConfig(app);
    await app.listen(3000, "0.0.0.0");
}

bootstrap();
