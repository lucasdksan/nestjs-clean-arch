import { BadRequestError } from "../../../../../shared/application/errors/bad-request-error";
import { NotFoundError } from "../../../../../shared/domain/errors/not-found-error";
import { UserEntity } from "../../../../domain/entities/user.entity";
import { UserDataBuilder } from "../../../../domain/testing/helpers/user-data-builder";
import { UserInMemoryRepository } from "../../../../infrastructure/database/in-memory/repositories/user-in-memory.repository";
import { UpdateUser } from "../../update-user.usecase";

describe("Update User Usecase unit test", ()=>{
    let sut: UpdateUser.UseCase;
    let repository: UserInMemoryRepository;

    beforeEach(()=>{
        repository = new UserInMemoryRepository();
        sut = new UpdateUser.UseCase(repository);
    });

    it("Should throws error when entity not found", async ()=>{
        await expect(()=> sut.execute({ id: "fake", name: "test name" })).rejects.toThrow(
            new NotFoundError("Entity not found")
        )
    });

    it("Should throws error when name not provided", async ()=>{
        await expect(()=> sut.execute({ id: "fake", name: "" })).rejects.toThrow(
            new BadRequestError("Name not provided")
        )
    });

    it("Should update a user", async ()=>{
        const spyUpdate = jest.spyOn(repository, "update");
        const items = [new UserEntity(UserDataBuilder({}))];

        repository.items = items;

        const result = await sut.execute({ id: items[0].id, name: "Lucas S." });

        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(result).toMatchObject({
            id: items[0].id,
            name: "Lucas S.",
            email: items[0].email,
            password: items[0].password,
            createdAt: items[0].createdAt,
        })
    });
});
