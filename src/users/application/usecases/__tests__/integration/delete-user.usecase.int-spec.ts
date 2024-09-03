import { PrismaClient } from "@prisma/client";
import { UserPrismaRepository } from "../../../../infrastructure/database/prisma/repositories/user-prisma.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { setupPrismaTests } from "../../../../../shared/infrastructure/database/prisma/testing/setup-prisma-tests";
import { DatabaseModule } from "../../../../../shared/infrastructure/database/database.module";
import { DeleteUser } from "../../delete-user.usecase";
import { NotFoundError } from "../../../../../shared/domain/errors/not-found-error";
import { UserEntity } from "../../../../domain/entities/user.entity";
import { UserDataBuilder } from "../../../../domain/testing/helpers/user-data-builder";

describe("Delete UseCase Integration tests", ()=>{
    const prismaService = new PrismaClient();
    let sut: DeleteUser.UseCase;
    let repository: UserPrismaRepository;
    let module: TestingModule;

    beforeAll(async ()=> {
        setupPrismaTests();
        module = await Test.createTestingModule({
            imports: [DatabaseModule.forTest(prismaService)]
        }).compile();
        repository = new UserPrismaRepository(prismaService as any);
    });

    beforeEach(async ()=>{
        sut = new DeleteUser.UseCase(repository);
        await prismaService.user.deleteMany();
    });

    afterAll(async ()=>{
        await module.close();
    });

    it("should throws error when enti(ty not found",async ()=>{
        await expect(()=> sut.execute({ id: "fake id" })).rejects.toThrow(
            new NotFoundError("UserModel not found using ID fake id")
        );
    });

    it("should delete a user", async () => {
        const entity = new UserEntity(UserDataBuilder({}));
        const newUser = await prismaService.user.create({
            data: entity.toJSON(),
        });

        await sut.execute({ id: newUser.id });

        const output = await prismaService.user.findUnique({
            where: {
                id: entity.id
            }
        });

        expect(output.name).toBeNull();

        const models = await prismaService.user.findMany({});

        expect(models).toHaveLength(0);
    });
});
