import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { EnvConfigModule } from "../../shared/infrastructure/env-config/env-config.module";
import { JwtModule } from "@nestjs/jwt";
import { EnvConfigService } from "../../shared/infrastructure/env-config/env-config.service";

@Module({
    imports: [
        EnvConfigModule,
        JwtModule.registerAsync({
            imports: [EnvConfigModule],
            useFactory: async (configService: EnvConfigService) => ({
                secret: configService.getJwtSecret(),
                global: true,
                signOptions: {
                    expiresIn: configService.getJwtExpiresInSeconds(),
                }
            }),
            inject: [EnvConfigService]
        }),
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule { }
