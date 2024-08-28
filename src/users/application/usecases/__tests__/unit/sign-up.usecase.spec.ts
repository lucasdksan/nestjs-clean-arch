import { HashProvider } from "../../../../../shared/application/providers/hash-provider";
import { ConflictError } from "../../../../../shared/domain/errors/conflict-error";
import { UserDataBuilder } from "../../../../domain/testing/helpers/user-data-builder";
import { UserInMemoryRepository } from "../../../../infrastructure/database/in-memory/repositories/user-in-memory.repository";
import { BcryptjsHashProvider } from "../../../../infrastructure/providers/hash-provider/bcryptjs-hash.provider";
import { BadRequestError } from "../../../../../shared/application/errors/bad-request-error";
import { SignupUseCase } from "../../sign-up.usecase";


describe("Signup UseCase test unit", ()=> {
    let sut: SignupUseCase.UseCase;
    let repository: UserInMemoryRepository;
    let hashProvider: HashProvider;

    beforeEach(()=>{
        repository = new UserInMemoryRepository();
        hashProvider = new BcryptjsHashProvider();
        sut = new SignupUseCase.UseCase(repository, hashProvider);
    });

    it("Should create a user", async ()=>{
        const spyInsert = jest.spyOn(repository, "insert");
        const props = UserDataBuilder({});
        const result = await sut.execute({
            email: props.email,
            password: props.password,
            name: props.name
        });

        expect(result.id).toBeDefined();
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(spyInsert).toHaveBeenCalledTimes(1);
    });

    it("Should not be able to register with same email twice", async ()=>{
        const props = UserDataBuilder({ email: "a@a.gmail.com" });
        await sut.execute(props);

        await expect(()=> sut.execute(props)).rejects.toBeInstanceOf(ConflictError);
    });

    it("Should throws error when name not provided", async ()=>{
        const props = Object.assign(UserDataBuilder({}), { name: null });

        await expect(()=> sut.execute(props)).rejects.toBeInstanceOf(BadRequestError);
    });

    it("Should throws error when email not provided", async ()=>{
        const props = Object.assign(UserDataBuilder({}), { email: null });

        await expect(()=> sut.execute(props)).rejects.toBeInstanceOf(BadRequestError);
    });

    it("Should throws error when password not provided", async ()=>{
        const props = Object.assign(UserDataBuilder({}), { password: null });

        await expect(()=> sut.execute(props)).rejects.toBeInstanceOf(BadRequestError);
    });
});
