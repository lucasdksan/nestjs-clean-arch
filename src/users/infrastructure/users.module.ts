import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserInMemoryRepository } from "./database/in-memory/repositories/user-in-memory.repository";
import { BcryptjsHashProvider } from "./providers/hash-provider/bcryptjs-hash.provider";
import { Signup } from "../application/usecases/sign-up.usecase";
import { UserRepository } from "../domain/repositories/user.repository";
import { HashProvider } from "../../shared/application/providers/hash-provider";
import { Signin } from "../application/usecases/sign-in.usecase";
import { GetUser } from "../application/usecases/get-user.usecase";
import { ListUsers } from "../application/usecases/list-users.usecase";
import { UpdateUser } from "../application/usecases/update-user.usecase";
import { UpdatePassword } from "../application/usecases/update-password.usecase";
import { DeleteUser } from "../application/usecases/delete-user.usecase";
import { PrismaService } from "../../shared/infrastructure/database/prisma/prisma.service";
import { UserPrismaRepository } from "./database/prisma/repositories/user-prisma.repository";
import { AuthModule } from "../../auth/infrastructure/auth.module";

@Module({
    imports: [AuthModule],
    controllers: [UsersController],
    providers: [
        {
            provide: "PrismaService",
            useClass: PrismaService
        },
        {
            provide: "UserRepository",
            useFactory: (prismaService: PrismaService)=> new UserPrismaRepository(prismaService),
            inject: [
                "PrismaService"
            ]
        },
        {
            provide: "HashProvider",
            useClass: BcryptjsHashProvider,
        },
        {
            provide: Signup.UseCase,
            useFactory: (
                useRepository: UserRepository.Repository,
                hashProvider: HashProvider
            )=> new Signup.UseCase(useRepository, hashProvider),
            inject: ["UserRepository", "HashProvider"]
        },
        {
            provide: Signin.UseCase,
            useFactory: (
                useRepository: UserRepository.Repository,
                hashProvider: HashProvider
            )=> new Signin.UseCase(useRepository, hashProvider),
            inject: ["UserRepository", "HashProvider"]
        },
        {
            provide: GetUser.UseCase,
            useFactory: (
                useRepository: UserRepository.Repository
            )=> new GetUser.UseCase(useRepository),
            inject: ["UserRepository"]
        },
        {
            provide: ListUsers.UseCase,
            useFactory: (
                useRepository: UserRepository.Repository
            )=> new ListUsers.UseCase(useRepository),
            inject: ["UserRepository"]
        },
        {
            provide: UpdateUser.UseCase,
            useFactory: (
                useRepository: UserRepository.Repository
            )=> new UpdateUser.UseCase(useRepository),
            inject: ["UserRepository"]
        },
        {
            provide: UpdatePassword.UseCase,
            useFactory: (
                useRepository: UserRepository.Repository,
                hashProvider: HashProvider
            )=> new UpdatePassword.UseCase(useRepository, hashProvider),
            inject: ["UserRepository", "HashProvider"]
        },
        {
            provide: DeleteUser.UseCase,
            useFactory: (
                useRepository: UserRepository.Repository
            )=> new DeleteUser.UseCase(useRepository),
            inject: ["UserRepository"]
        },
    ],
})
export class UsersModule {}
