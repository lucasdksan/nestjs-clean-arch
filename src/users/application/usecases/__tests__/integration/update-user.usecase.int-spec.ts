import { PrismaClient } from "@prisma/client";
import { UpdateUser } from "../../update-user.usecase";
import { UserPrismaRepository } from "../../../../infrastructure/database/prisma/repositories/user-prisma.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { setupPrismaTests } from "../../../../../shared/infrastructure/database/prisma/testing/setup-prisma-tests";
import { DatabaseModule } from "../../../../../shared/infrastructure/database/database.module";
import { NotFoundError } from "../../../../../shared/domain/errors/not-found-error";
import { UserDataBuilder } from "../../../../domain/testing/helpers/user-data-builder";
import { UserEntity } from "../../../../domain/entities/user.entity";

describe("Update User UseCase integration tests", () => {
    const prismaService = new PrismaClient();
    let sut: UpdateUser.UseCase;
    let repository: UserPrismaRepository;
    let module: TestingModule;

    beforeAll(async () => {
        setupPrismaTests()
        module = await Test.createTestingModule({
            imports: [DatabaseModule.forTest(prismaService)],
        }).compile();
        repository = new UserPrismaRepository(prismaService as any);
    });

    beforeEach(async () => {
        sut = new UpdateUser.UseCase(repository);
        await prismaService.user.deleteMany();
    });

    afterAll(async () => {
        await module.close();
    });

    it("should throws error when entity not found", async () => {
        await expect(() =>
            sut.execute({ id: "fakeId", name: "fake name" }),
        ).rejects.toThrow(new NotFoundError("UserModel not found using ID fakeId"));
    });

    it("should update a user", async () => {
        const entity = new UserEntity(UserDataBuilder({}));
        const model = await prismaService.user.create({
            data: entity.toJSON(),
        });

        const output = await sut.execute({ id: entity._id, name: "new name" });

        expect(output.name).toBe("new name");
    });
});
