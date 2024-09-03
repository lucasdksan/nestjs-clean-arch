import { UserPrismaRepository } from './../../../../infrastructure/database/prisma/repositories/user-prisma.repository';
import { PrismaClient } from "@prisma/client";
import { GetUser } from "../../get-user.usecase";
import { Test, TestingModule } from '@nestjs/testing';
import { setupPrismaTests } from '../../../../../shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { DatabaseModule } from '../../../../../shared/infrastructure/database/database.module';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserDataBuilder } from '../../../../domain/testing/helpers/user-data-builder';

describe("Get UseCase integration test", () => {
    const prismaService = new PrismaClient();
    let sut: GetUser.UseCase;
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
        sut = new GetUser.UseCase(repository);
        await prismaService.user.deleteMany();
    });

    afterAll(async ()=>{
        await module.close();
    });

    it("Should returns a user",async ()=>{
        const entity = new UserEntity(UserDataBuilder({}));
        const model = await prismaService.user.create({
            data: entity.toJSON(),
        });

        const output = await sut.execute({ id: entity.id });

        expect(output).toMatchObject(model);
    });
});
