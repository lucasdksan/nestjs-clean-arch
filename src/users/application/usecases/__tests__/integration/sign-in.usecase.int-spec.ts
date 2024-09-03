import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestError } from "../../../../../shared/application/errors/bad-request-error";
import { InvalidCredentialsError } from "../../../../../shared/application/errors/invalid-credentials-error";
import { HashProvider } from "../../../../../shared/application/providers/hash-provider";
import { NotFoundError } from "../../../../../shared/domain/errors/not-found-error";
import { DatabaseModule } from "../../../../../shared/infrastructure/database/database.module";
import { setupPrismaTests } from "../../../../../shared/infrastructure/database/prisma/testing/setup-prisma-tests";
import { UserEntity } from "../../../../domain/entities/user.entity";
import { UserDataBuilder } from "../../../../domain/testing/helpers/user-data-builder";
import { UserPrismaRepository } from "../../../../infrastructure/database/prisma/repositories/user-prisma.repository";
import { BcryptjsHashProvider } from "../../../../infrastructure/providers/hash-provider/bcryptjs-hash.provider";
import { Signin } from "../../sign-in.usecase";
import { PrismaClient } from "@prisma/client";

describe("Signin UseCase integration tests", () => {
    const prismaService = new PrismaClient();
    let sut: Signin.UseCase;
    let repository: UserPrismaRepository;
    let module: TestingModule;
    let hashProvider: HashProvider;

    beforeAll(async () => {
        setupPrismaTests();
        module = await Test.createTestingModule({
            imports: [DatabaseModule.forTest(prismaService)],
        }).compile();
        repository = new UserPrismaRepository(prismaService as any);
        hashProvider = new BcryptjsHashProvider();
    });

    beforeEach(async () => {
        sut = new Signin.UseCase(repository, hashProvider);
        await prismaService.user.deleteMany();
    });

    afterAll(async () => {
        await module.close();
    });

    it("should not be able to authenticate with wrong email", async () => {
        const entity = new UserEntity(UserDataBuilder({}));
        await expect(() =>
            sut.execute({
                email: entity.email,
                password: "1234",
            }),
        ).rejects.toBeInstanceOf(NotFoundError);
    });

    it("should not be able to authenticate with wrong password", async () => {
        const hashPassword = await hashProvider.generateHash("1234");
        const entity = new UserEntity(
            UserDataBuilder({
                email: "a@a.com",
                password: hashPassword,
            }),
        );
        const newUser = await prismaService.user.create({
            data: entity.toJSON(),
        });

        await expect(() =>
            sut.execute({
                email: "a@a.com",
                password: "fake",
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it("should throws error when email not provided", async () => {
        await expect(() =>
            sut.execute({
                email: null,
                password: "1234",
            }),
        ).rejects.toBeInstanceOf(BadRequestError);
    });

    it("should throws error when password not provided", async () => {
        await expect(() =>
            sut.execute({
                email: "a@a.com",
                password: null,
            }),
        ).rejects.toBeInstanceOf(BadRequestError);
    });

    it("should authenticate a user", async () => {
        const hashPassword = await hashProvider.generateHash("1234");
        const entity = new UserEntity(
            UserDataBuilder({ email: "a@a.com", password: hashPassword }),
        );
        const newUser = await prismaService.user.create({
            data: entity.toJSON(),
        });

        const output = await sut.execute({
            email: "a@a.com",
            password: "1234",
        });

        expect(output).toMatchObject(entity.toJSON());
    });
});
