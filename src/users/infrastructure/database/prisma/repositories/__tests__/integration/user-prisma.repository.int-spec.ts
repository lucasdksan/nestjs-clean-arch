import { PrismaClient } from "@prisma/client";
import { UserPrismaRepository } from "../../user-prisma.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { setupPrismaTests } from "../../../../../../../shared/infrastructure/database/prisma/testing/setup-prisma-tests";
import { DatabaseModule } from "../../../../../../../shared/infrastructure/database/database.module";
import { NotFoundError } from "../../../../../../../shared/domain/errors/not-found-error";
import { UserEntity } from "../../../../../../domain/entities/user.entity";
import { UserDataBuilder } from "../../../../../../domain/testing/helpers/user-data-builder";
import { UserRepository } from "../../../../../../domain/repositories/user.repository";

describe("UserPrismaRepository integration tests", () => {
    const prismaService = new PrismaClient();
    let sut: UserPrismaRepository;
    let module: TestingModule;

    beforeAll(async () => {
        setupPrismaTests();
        module = await Test.createTestingModule({
            imports: [DatabaseModule.forTest(prismaService)],
        }).compile();
    }, 10000);

    beforeEach(async () => {
        sut = new UserPrismaRepository(prismaService as any);
        await prismaService.user.deleteMany();
    });

    it("should throws error when entity not found", async () => {
        expect(() => sut.findById("FakeId")).rejects.toThrow(
            new NotFoundError("UserModel not found using ID FakeId"),
        );
    });

    it("should finds a entity by id", async () => {
        const entity = new UserEntity(UserDataBuilder({}));
        const newUser = await prismaService.user.create({
            data: entity.toJSON(),
        });

        const output = await sut.findById(newUser.id);
        expect(output.toJSON()).toStrictEqual(entity.toJSON());
    });

    it("should insert new entity", async () => {
        const entity = new UserEntity(UserDataBuilder({}));

        await sut.insert(entity);

        const result = await prismaService.user.findUnique({
            where: {
                id: entity.id
            }
        });

        expect(result).toStrictEqual(entity.toJSON());
    });

    it("should all users", async () => {
        const entity = new UserEntity(UserDataBuilder({}));

        await prismaService.user.create({
            data: entity.toJSON(),
        });

        const entities = await sut.findAll();

        expect(entities).toHaveLength(1);
        entities.map(item => expect(item.toJSON()).toStrictEqual(entity.toJSON()));
    });

    describe("Search method tests", ()=>{
        it("should apply only pagination when the other params are null", async () => {
            const createdAt = new Date();
            const entities: UserEntity[] = [];
            const arrange = Array(16).fill(UserDataBuilder({}));

            arrange.forEach((element, index)=>{
                entities.push(
                    new UserEntity({
                        ...element,
                        email: `user-${index}@gmail.com`,
                        createdAt: new Date(createdAt.getTime() + index),
                    })
                );
            });

            await prismaService.user.createMany({
                data: entities.map(entity => entity.toJSON())
            })

            const searchOutput = await sut.search(new UserRepository.SearchParams());
            const { items } = searchOutput;

            expect(searchOutput).toBeInstanceOf(UserRepository.SearchResult);
            expect(searchOutput.total).toBe(16);
            expect(searchOutput.items.length).toBe(15);

            searchOutput.items.forEach(item => {
                expect(item).toBeInstanceOf(UserEntity);
            });

            items.reverse().forEach((item, index)=> {
                expect(`user-${index + 1}@gmail.com`).toBe(item.email);
            });
        });

        it("Should search using filter, sort and paginate", async () => {
            const createdAt = new Date();
            const entities: UserEntity[] = [];
            const arrange = ["test", "a", "TEST", "b", "TeSt",];

            arrange.forEach((element, index)=>{
                entities.push(
                    new UserEntity({
                        ...UserDataBuilder({ name: element }),
                        createdAt: new Date(createdAt.getTime() + index),
                    })
                );
            });

            await prismaService.user.createMany({
                data: entities.map(entity => entity.toJSON())
            });

            const searchOutputPage1 = await sut.search(new UserRepository.SearchParams({
                page: 1,
                perPage: 2,
                sort: "name",
                sortDir: "asc",
                filter: "TEST"
            }));

            expect(searchOutputPage1.items[0].toJSON()).toMatchObject(
                entities[0].toJSON(),
            );

            expect(searchOutputPage1.items[1].toJSON()).toMatchObject(
                entities[4].toJSON(),
            );

            const searchOutputPage2 = await sut.search(new UserRepository.SearchParams({
                page: 1,
                perPage: 2,
                sort: "name",
                sortDir: "asc",
                filter: "TEST"
            }));

            expect(searchOutputPage2.items[0].toJSON()).toMatchObject(
                entities[2].toJSON(),
            )
        });
    });
});
