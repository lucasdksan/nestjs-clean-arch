import { InvalidPasswordError } from "../../../../../shared/application/errors/invalid-password-error";
import { HashProvider } from "../../../../../shared/application/providers/hash-provider"
import { NotFoundError } from "../../../../../shared/domain/errors/not-found-error";
import { UserEntity } from "../../../../domain/entities/user.entity";
import { UserDataBuilder } from "../../../../domain/testing/helpers/user-data-builder";
import { UserInMemoryRepository } from "../../../../infrastructure/database/in-memory/repositories/user-in-memory.repository"
import { BcryptjsHashProvider } from "../../../../infrastructure/providers/hash-provider/bcryptjs-hash.provider";
import { UpdatePassword } from "../../update-password.usecase"

describe("UpdatePasswordUseCase unit tests", () => {
    let sut: UpdatePassword.UseCase;
    let repository: UserInMemoryRepository;
    let hashProvider: HashProvider;

    beforeEach(() => {
        repository = new UserInMemoryRepository()
        hashProvider = new BcryptjsHashProvider()
        sut = new UpdatePassword.UseCase(repository, hashProvider)
    })

    it("Should throws error when entity not found", async () => {
        await expect(() =>
            sut.execute({
                id: "fakeId",
                password: "test password",
                oldPassword: "old password",
            }),
        ).rejects.toThrow(new NotFoundError("Entity not found"))
    })

    it("Should throws error when old password not provided", async () => {
        const entity = new UserEntity(UserDataBuilder({}))
        repository.items = [entity]
        await expect(() =>
            sut.execute({
                id: entity.id,
                password: "test password",
                oldPassword: "",
            }),
        ).rejects.toThrow(
            new InvalidPasswordError("Old password and new Password is required"),
        )
    })

    it("Should throws error when new password not provided", async () => {
        const entity = new UserEntity(UserDataBuilder({ password: "1234" }))
        repository.items = [entity]
        await expect(() =>
            sut.execute({
                id: entity.id,
                password: "",
                oldPassword: "1234",
            }),
        ).rejects.toThrow(
            new InvalidPasswordError("Old password and new Password is required"),
        )
    })

    it("Should throws error when new old password does not match", async () => {
        const hashPassword = await hashProvider.generateHash("1234")
        const entity = new UserEntity(UserDataBuilder({ password: hashPassword }))
        repository.items = [entity]
        await expect(() =>
            sut.execute({
                id: entity.id,
                password: "4567",
                oldPassword: "123456",
            }),
        ).rejects.toThrow(new InvalidPasswordError("Old password does not match"))
    })

    it("Should update a password", async () => {
        const hashPassword = await hashProvider.generateHash("1234")
        const spyUpdate = jest.spyOn(repository, "update")
        const items = [new UserEntity(UserDataBuilder({ password: hashPassword }))]
        repository.items = items

        const result = await sut.execute({
            id: items[0].id,
            password: "4567",
            oldPassword: "1234",
        })

        const checkNewPassword = await hashProvider.compareHash(
            "4567",
            result.password,
        )
        expect(spyUpdate).toHaveBeenCalledTimes(1)
        expect(checkNewPassword).toBeTruthy()
    })
})
