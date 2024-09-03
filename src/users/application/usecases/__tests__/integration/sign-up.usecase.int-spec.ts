import { PrismaClient } from "@prisma/client";
import { UserPrismaRepository } from "../../../../infrastructure/database/prisma/repositories/user-prisma.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { setupPrismaTests } from "../../../../../shared/infrastructure/database/prisma/testing/setup-prisma-tests";
import { DatabaseModule } from "../../../../../shared/infrastructure/database/database.module";
import { Signup } from "../../sign-up.usecase";
import { HashProvider } from "../../../../../shared/application/providers/hash-provider";
import { BcryptjsHashProvider } from "../../../../infrastructure/providers/hash-provider/bcryptjs-hash.provider";

describe("Signup UseCase Integration tests", ()=>{
    const prismaService = new PrismaClient();
    let sut: Signup.UseCase;
    let repository: UserPrismaRepository;
    let module: TestingModule;
    let hash: HashProvider;

    beforeAll(async ()=> {
        setupPrismaTests();
        module = await Test.createTestingModule({
            imports: [DatabaseModule.forTest(prismaService)]
        }).compile();
        repository = new UserPrismaRepository(prismaService as any);
        hash = new BcryptjsHashProvider();
    });

    beforeEach(async ()=>{
        sut = new Signup.UseCase(repository, hash);
        await prismaService.user.deleteMany();
    });

    afterAll(async ()=>{
        await module.close();
    });

    it("should create a user",async ()=>{
        const props = {
            name: "test name",
            email: "a@gmail.com",
            password: "testSenha12345"
        };
        const output = await sut.execute(props);

        expect(output.id).toBeDefined();
        expect(output.createdAt).toBeInstanceOf(Date);
    });
});
