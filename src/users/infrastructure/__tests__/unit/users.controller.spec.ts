import { UserOutput } from "../../../application/dtos/user-output.dto";
import { GetUser } from "../../../application/usecases/get-user.usecase";
import { ListUsers } from "../../../application/usecases/list-users.usecase";
import { Signin } from "../../../application/usecases/sign-in.usecase";
import { Signup } from "../../../application/usecases/sign-up.usecase";
import { UpdatePassword } from "../../../application/usecases/update-password.usecase";
import { UpdateUser } from "../../../application/usecases/update-user.usecase";
import { SigninDto } from "../../dtos/sign-in.dto";
import { SignupDto } from "../../dtos/sign-up.dto";
import { UpdatePasswordDto } from "../../dtos/update-password.dto";
import { UpdateUserDto } from "../../dtos/update-user.dto";
import { UsersController } from "../../users.controller";

describe("UsersController unit tests", () => {
    let sut: UsersController;
    let id: string;
    let props: UserOutput;

    beforeEach(()=> {
        sut = new UsersController();
        id = "0c7d61a1-54b4-4c61-bc69-0d2e0ab34ab7";
        props = {
            id,
            name: "Lucas Silva",
            email: "lucas.leoncio.silva@gmail.com",
            password: "123456789",
            createdAt: new Date()
        }
    });

    it("should be defined", ()=>{
        expect(sut).toBeDefined();
    })

    it("Should create a user", async ()=> {
        const output: Signup.Output = props;
        const mockSignupUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output)),
        }
        const input: SignupDto = {
            name: "Lucas Silva",
            email: "lucas.leoncio.silva@gmail.com",
            password: "123456789",
        };

        sut["signupUseCase"] = mockSignupUseCase as any;

        const result = await sut.create(input);

        expect(output).toMatchObject(result);
        expect(mockSignupUseCase.execute).toHaveBeenCalledWith(input);
    });

    it("Should authenticate a user", async ()=> {
        const output: Signin.Output = props;
        const mockSigninUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output)),
        }
        const input: SigninDto = {
            email: "lucas.leoncio.silva@gmail.com",
            password: "123456789",
        };

        sut["signinUseCase"] = mockSigninUseCase as any;

        const result = await sut.login(input);

        expect(output).toMatchObject(result);
        expect(mockSigninUseCase.execute).toHaveBeenCalledWith(input);
    });

    it("Should update a user", async ()=> {
        const output: UpdateUser.Output = props;
        const mockUpdateUserUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output)),
        }
        const input: UpdateUserDto = {
            name: "Lucas Silva Leoncio"
        };

        sut["updataUserUseCase"] = mockUpdateUserUseCase as any;

        const result = await sut.update(id, input);

        expect(output).toMatchObject(result);
        expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    });

    it("Should update password a user", async ()=> {
        const output: UpdatePassword.Output = props;
        const mockUpdatePasswordUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output)),
        }
        const input: UpdatePasswordDto = {
            oldPassword: "123456789",
            password: "12344443333",
        };

        sut["updatePasswordUseCase"] = mockUpdatePasswordUseCase as any;

        const result = await sut.updatePassword(id, input);

        expect(output).toMatchObject(result);
        expect(mockUpdatePasswordUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    });

    it("Should remove a user", async ()=> {
        const output = undefined;
        const mockDeleteUserUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output)),
        }

        sut["deleteUseCase"] = mockDeleteUserUseCase as any;

        const result = await sut.remove(id);

        expect(output).toStrictEqual(result);
        expect(mockDeleteUserUseCase.execute).toHaveBeenCalledWith({ id });
    });

    it("Should Find one a user", async ()=> {
        const output: GetUser.Output = props;
        const mockGetUserUserUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output)),
        }

        sut["getUserUseCase"] = mockGetUserUserUseCase as any;

        const result = await sut.findOne(id);

        expect(output).toStrictEqual(result);
        expect(mockGetUserUserUseCase.execute).toHaveBeenCalledWith({ id });
    });

    it("Should list users", async ()=> {
        const output: ListUsers.Output = {
            items: [props],
            currentPage: 1,
            lastPage: 1,
            perPage: 1,
            total: 1
        };
        const mockListUsersUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output)),
        }
        const searchParams = {
            page: 1,
            perPage: 1
        };

        sut["listUsersUseCase"] = mockListUsersUseCase as any;

        const result = await sut.search(searchParams);

        expect(output).toStrictEqual(result);
        expect(mockListUsersUseCase.execute).toHaveBeenCalledWith(searchParams);
    });
});
