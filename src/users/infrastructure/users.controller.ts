import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpCode, Query, Put } from "@nestjs/common";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { SignupDto } from "./dtos/sign-up.dto";
import { Signup } from "../application/usecases/sign-up.usecase";
import { Signin } from "../application/usecases/sign-in.usecase";
import { UpdateUser } from "../application/usecases/update-user.usecase";
import { UpdatePassword } from "../application/usecases/update-password.usecase";
import { DeleteUser } from "../application/usecases/delete-user.usecase";
import { GetUser } from "../application/usecases/get-user.usecase";
import { ListUsers } from "../application/usecases/list-users.usecase";
import { SigninDto } from "./dtos/sign-in.dto";
import { ListUsersDto } from "./dtos/list-users.dto";
import { UpdatePasswordDto } from "./dtos/update-password.dto";

@Controller("users")
export class UsersController {
    @Inject(Signup.UseCase)
    private signupUseCase: Signup.UseCase;

    @Inject(Signin.UseCase)
    private signinUseCase: Signin.UseCase;

    @Inject(UpdateUser.UseCase)
    private updataUserUseCase: UpdateUser.UseCase;

    @Inject(UpdatePassword.UseCase)
    private updatePasswordUseCase: UpdatePassword.UseCase;

    @Inject(DeleteUser.UseCase)
    private deleteUseCase: DeleteUser.UseCase;

    @Inject(GetUser.UseCase)
    private getUserUseCase: GetUser.UseCase;

    @Inject(ListUsers.UseCase)
    private listUsersUseCase: ListUsers.UseCase;

    @Post()
    async create(@Body() signupDto: SignupDto) {
        return this.signupUseCase.execute(signupDto);
    }

    @HttpCode(200)
    @Post("login")
    async login(@Body() signinDto: SigninDto) {
        return this.signinUseCase.execute(signinDto);
    }

    @Get()
    async search(@Query() searchParams: ListUsersDto) {
        return this.listUsersUseCase.execute(searchParams);
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.getUserUseCase.execute({ id });
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.updataUserUseCase.execute({ id, ...updateUserDto });
    }

    @Patch(":id")
    async updatePassword(@Param("id") id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
        return this.updatePasswordUseCase.execute({ id, ...updatePasswordDto });
    }

    @HttpCode(204)
    @Delete(":id")
    async remove(@Param("id") id: string) {
        await this.deleteUseCase.execute({ id });
    }
}
