import { PrismaClient, User } from "@prisma/client";
import { UserModelMapper } from "../../user-model.mapper";
import { ValidationError } from "../../../../../../../shared/domain/errors/validation-error";
import { setupPrismaTests } from "../../../../../../../shared/infrastructure/database/prisma/testing/setup-prisma-tests";
import { UserEntity } from "../../../../../../domain/entities/user.entity";

describe("User Model Mapper integration test", () => {
    let prismaService: PrismaClient;
    let props: any;

    beforeAll(async () => {
        setupPrismaTests();

        prismaService = new PrismaClient();
        await prismaService.$connect();
    }, 10000);

    beforeEach(async () => {
        await prismaService.user.deleteMany();
        props = {
            id: "0c7d61a1-54b4-4c61-bc69-0d2e0ab34ab7",
            name: "Lucas da Silva Leoncio",
            email: "lucas.leoncio.silva@gmail.com",
            password: "$2a$10$VwPIisXtzJwimezEtTJMvO69t1yUA1VTixgq9MIPt0fT2.BTlLP0.",
            createdAt: new Date(),
        }
    });

    afterAll(async () => {
        await prismaService.$disconnect();
    });

    it("Should throws error when user model is invalid", () => {
        const model: User = Object.assign(props, { name: null });

        expect(() => UserModelMapper.toEntity(model)).toThrowError(ValidationError);
    });

    it("should convert a user model to a user entity", async () => {
        const model: User = await prismaService.user.create({
            data: props,
        });
        const sut = UserModelMapper.toEntity(model);

        expect(sut).toBeInstanceOf(UserEntity);
        expect(sut.toJSON()).toStrictEqual(props);
    });
});
