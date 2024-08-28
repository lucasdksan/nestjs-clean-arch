import { UserEntity } from "../../../../domain/entities/user.entity";
import { UserRepository } from "../../../../domain/repositories/user.repository";
import { UserDataBuilder } from "../../../../domain/testing/helpers/user-data-builder";
import { UserInMemoryRepository } from "../../../../infrastructure/database/in-memory/repositories/user-in-memory.repository";
import { ListUsers } from "../../list-users.usecase";

describe("ListUserUsecase unit test", ()=>{
    let sut: ListUsers.UseCase;
    let repository: UserInMemoryRepository;

    beforeEach(()=>{
        repository = new UserInMemoryRepository();
        sut = new ListUsers.UseCase(repository);
    });

    it("toOutput Method", ()=>{
        let result = new UserRepository.SearchResult({
            items: [] as any,
            total: 1,
            currentPage: 1,
            perPage: 2,
            sort: null,
            sortDir: null,
            filter: null
        });

        let output = sut["toOutput"](result);

        expect(output).toStrictEqual({
            items: [],
            total: 1,
            currentPage: 1,
            lastPage: 1,
            perPage: 2,
        });
        const entity = new UserEntity(UserDataBuilder({}));

        result = new UserRepository.SearchResult({
            items: [entity],
            total: 1,
            currentPage: 1,
            perPage: 2,
            sort: null,
            sortDir: null,
            filter: null
        });

        output = sut["toOutput"](result);

        expect(output).toStrictEqual({
            items: [entity.toJSON()],
            total: 1,
            currentPage: 1,
            lastPage: 1,
            perPage: 2,
        });
    });

    it("Should return the users using pagination, sort and filter", async ()=>{
        const items = [
            new UserEntity(UserDataBuilder({ name: "a" })),
            new UserEntity(UserDataBuilder({ name: "AA" })),
            new UserEntity(UserDataBuilder({ name: "Aa" })),
            new UserEntity(UserDataBuilder({ name: "b" })),
            new UserEntity(UserDataBuilder({ name: "c" })),
        ];

        repository.items = items;

        let output = await sut.execute({
            page: 1,
            perPage: 2,
            sort: "name",
            sortDir: "asc",
            filter: "a",
        });

        expect(output).toStrictEqual({
            items: [items[1].toJSON(), items[2].toJSON()],
            total: 3,
            currentPage: 1,
            lastPage: 2,
            perPage: 2,
        });

        output = await sut.execute({
            page: 2,
            perPage: 2,
            sort: "name",
            sortDir: "asc",
            filter: "a",
        });

        expect(output).toStrictEqual({
            items: [items[0].toJSON()],
            total: 3,
            currentPage: 2,
            lastPage: 2,
            perPage: 2,
        });

        output = await sut.execute({
            page: 1,
            perPage: 3,
            sort: "name",
            sortDir: "desc",
            filter: "a",
        });

        expect(output).toStrictEqual({
            items: [items[0].toJSON(), items[2].toJSON(), items[1].toJSON()],
            total: 3,
            currentPage: 1,
            lastPage: 1,
            perPage: 3,
        });
    });
});
