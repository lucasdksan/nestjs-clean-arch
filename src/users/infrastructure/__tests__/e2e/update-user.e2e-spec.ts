import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { UpdateUserDto } from "../../dtos/update-user.dto";
import { PrismaClient } from "@prisma/client";
import { UserEntity } from "../../../domain/entities/user.entity";
import { setupPrismaTests } from "../../../../shared/infrastructure/database/prisma/testing/setup-prisma-tests";
import { EnvConfigModule } from "../../../../shared/infrastructure/env-config/env-config.module";
import { UsersModule } from "../../users.module";
import applayGlobalConfig from "../../../../global-config";
import { DatabaseModule } from "../../../../shared/infrastructure/database/database.module";
import { UserDataBuilder } from "../../../domain/testing/helpers/user-data-builder";
import request from "supertest";
import { UsersController } from "../../users.controller";
import { instanceToPlain } from "class-transformer";

describe("Users Controller Update E2E tests", () => {
    let app: INestApplication;
    let module: TestingModule;
    let repository: UserRepository.Repository;
    let updateUserDto: UpdateUserDto;
    const prismaService = new PrismaClient();
    let entity: UserEntity;

    beforeAll(async () => {
        setupPrismaTests();
        module = await Test.createTestingModule({
            imports: [
                EnvConfigModule,
                UsersModule,
                DatabaseModule.forTest(prismaService),
            ],
        }).compile();
        app = module.createNestApplication();
        applayGlobalConfig(app);
        await app.init();
        repository = module.get<UserRepository.Repository>("UserRepository");
    });

    beforeEach(async () => {
        updateUserDto = {
            name: "test name",
        };
        await prismaService.user.deleteMany();
        entity = new UserEntity(UserDataBuilder({}));
        await repository.insert(entity);
    });

    describe("PUT /users/:id", () => {
        it("should update a user", async () => {
            updateUserDto.name = "test name";
            const res = await request(app.getHttpServer())
                .put(`/users/${entity._id}`)
                .send(updateUserDto)
                .expect(200);
            const user = await repository.findById(entity._id);
            const presenter = UsersController.userToResponse(user.toJSON());
            const serialized = instanceToPlain(presenter);
            expect(res.body.data).toStrictEqual(serialized);
        });

        it("should return a error with 422 code when the request body is invalid", async () => {
            const res = await request(app.getHttpServer())
                .put(`/users/${entity._id}`)
                .send({})
                .expect(422);
            expect(res.body.error).toBe("Unprocessable Entity");
            expect(res.body.message).toEqual([
                "name should not be empty",
                "name must be a string",
            ]);
        });

        it("should return a error with 404 code when throw NotFoundError with invalid id", async () => {
            const res = await request(app.getHttpServer())
                .put("/users/fakeId")
                .send(updateUserDto)
                .expect(404)
                .expect({
                    statusCode: 404,
                    error: "Not Found",
                    message: "UserModel not found using ID fakeId",
                });
        });
    });
});
