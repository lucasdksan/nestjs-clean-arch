import { NotFoundError } from "../../../../../shared/domain/errors/not-found-error"
import { UserEntity } from "../../../../domain/entities/user.entity"
import { UserDataBuilder } from "../../../../domain/testing/helpers/user-data-builder"
import { UserInMemoryRepository } from "../../../../infrastructure/database/in-memory/repositories/user-in-memory.repository"
import { DeleteUser } from "../../delete-user.usecase"

describe("DeleteUserUseCase unit tests", () => {
    let sut: DeleteUser.UseCase;
    let repository: UserInMemoryRepository;

    beforeEach(() => {
        repository = new UserInMemoryRepository();
        sut = new DeleteUser.UseCase(repository);
    });

    it("Should throws error when entity not found", async () => {
        await expect(() => sut.execute({ id: "fakeId" })).rejects.toThrow(
            new NotFoundError("Entity not found"),
        );
    });

    it("Should delete a user", async () => {
        const spyDelete = jest.spyOn(repository, "delete");
        const items = [new UserEntity(UserDataBuilder({}))];
        repository.items = items;

        expect(repository.items).toHaveLength(1);
        await sut.execute({ id: items[0].id });
        expect(spyDelete).toHaveBeenCalledTimes(1);
        expect(repository.items).toHaveLength(0);
    });
});
