import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { PrismaClient } from "@prisma/client";
import { setupPrismaTests } from "../../../../shared/infrastructure/database/prisma/testing/setup-prisma-tests";
import { EnvConfigModule } from "../../../../shared/infrastructure/env-config/env-config.module";
import { UsersModule } from "../../users.module";
import { DatabaseModule } from "../../../../shared/infrastructure/database/database.module";
import { SignupDto } from "../../dtos/sign-up.dto";
import request from "supertest";
import { UsersController } from "../../users.controller";
import { instanceToPlain } from "class-transformer";

describe("Users Controller test e2e", ()=>{
    let app: INestApplication;
    let module: TestingModule;
    let repository: UserRepository.Repository;
    let signupDto: SignupDto;

    const prismaService = new PrismaClient();

    beforeAll(async ()=>{
        setupPrismaTests();

        module = await Test.createTestingModule({
            imports: [EnvConfigModule, UsersModule, DatabaseModule.forTest(prismaService)],
        }).compile();

        app = module.createNestApplication();

        await app.init()
        repository = module.get<UserRepository.Repository>("UserRepository");
    });

    beforeEach(async ()=>{
        signupDto = {
            name: "test name",
            email: "a1@gmail.com",
            password: "1234"
        };

        await prismaService.user.deleteMany();
    });

    describe("POST /users", ()=>{
        it("should create a user", async ()=>{
            const res = await request(app.getHttpServer()).post("/users").send(signupDto).expect(201);

            expect(Object.keys(res.body)).toStrictEqual([
                "id",
                "name",
                "email",
                "createdAt"
            ]);

            const user = await repository.findById(res.body.id);
            const presenter = UsersController.userToResponse(user.toJSON());
            const serialized = instanceToPlain(presenter);
            expect(res.body).toStrictEqual(serialized);
        });
    });
});
