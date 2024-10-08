import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpCode, Query, Put, UseGuards } from "@nestjs/common";
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
import { UserOutput } from "../application/dtos/user-output.dto";
import { UserPresenter } from "./presenters/user.presenter";
import { UserCollectionPresenter } from "./presenters/user-collection.presenter";
import { AuthService } from "../../auth/infrastructure/auth.service";
import { AuthGuard } from "../../auth/infrastructure/auth.guard";
import { ApiBearerAuth, ApiResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";

@ApiTags("Users")
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

    @Inject(AuthService)
    private authService: AuthService;

    static userToResponse(output: UserOutput){
        return new UserPresenter(output);
    }

    static listUsersToResponse(output: ListUsers.Output) {
        return new UserCollectionPresenter(output);
    }

    @ApiResponse({
        status: 409,
        description: "Conflito de email"
    })
    @ApiResponse({
        status: 422,
        description: "Corpo da requisição com dados invalidos"
    })
    @Post()
    async create(@Body() signupDto: SignupDto) {
        const output = await this.signupUseCase.execute(signupDto);

        return UsersController.userToResponse(output);
    }

    @ApiResponse({
        status: 200,
        schema: {
            type: "object",
            properties: {
                accessToken: {
                    type: "string"
                }
            }
        }
    })
    @ApiResponse({
        status: 422,
        description: "Corpo da requisição com dados invalidos"
    })
    @ApiResponse({
        status: 404,
        description: "Email não encontrado"
    })
    @ApiResponse({
        status: 400,
        description: "Credenciais inválidas"
    })
    @HttpCode(200)
    @Post("login")
    async login(@Body() signinDto: SigninDto) {
        const output = await this.signinUseCase.execute(signinDto);
        return this.authService.generateJwt(output.id);
    }

    @UseGuards(AuthGuard)
    @ApiResponse({
        status: 200,
        schema: {
            type: "object",
            properties: {
                meta: {
                    type: "object",
                    properties: {
                        total: {
                            type: "number",
                            title: "total de itens da pesquisa"
                        },
                        currentPage: {
                            type: "number",
                            title: "A página atual"
                        },
                        lastPage: {
                            type: "number",
                            title: "A última página"
                        },
                        perPage: {
                            type: "number",
                            title: "Quantos itens por página"
                        }
                    }
                },
                data: {
                    type: "array",
                    items: { $ref: getSchemaPath(UserPresenter) }
                }
            }
        }
    })
    @ApiResponse({
        status: 422,
        description: "Parâmetros de consulta invalidos"
    })
    @ApiResponse({
        status: 401,
        description: "Acesso não autorizado"
    })
    @ApiBearerAuth()
    @Get()
    async search(@Query() searchParams: ListUsersDto) {
        const output = await this.listUsersUseCase.execute(searchParams);
        return UsersController.listUsersToResponse(output);
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 401,
        description: "Acesso não autorizado"
    })
    @ApiResponse({
        status: 404,
        description: "Id não encontrado"
    })
    @UseGuards(AuthGuard)
    @Get(":id")
    async findOne(@Param("id") id: string) {
        const output = await this.getUserUseCase.execute({ id });
        return UsersController.userToResponse(output);
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 401,
        description: "Acesso não autorizado"
    })
    @ApiResponse({
        status: 404,
        description: "Id não encontrado"
    })
    @ApiResponse({
        status: 422,
        description: "Corpo da requisição com dados invalidos"
    })
    @UseGuards(AuthGuard)
    @Put(":id")
    async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        const output = await this.updataUserUseCase.execute({ id, ...updateUserDto });
        return UsersController.userToResponse(output);
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 401,
        description: "Acesso não autorizado"
    })
    @ApiResponse({
        status: 404,
        description: "Id não encontrado"
    })
    @ApiResponse({
        status: 422,
        description: "Corpo da requisição com dados invalidos"
    })
    @UseGuards(AuthGuard)
    @Patch(":id")
    async updatePassword(@Param("id") id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
        const output = await this.updatePasswordUseCase.execute({ id, ...updatePasswordDto });
        return UsersController.userToResponse(output);
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 401,
        description: "Acesso não autorizado"
    })
    @ApiResponse({
        status: 404,
        description: "Id não encontrado"
    })
    @ApiResponse({
        status: 204,
        description: "Resposta de confirmação a exclusão"
    })
    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Delete(":id")
    async remove(@Param("id") id: string) {
        await this.deleteUseCase.execute({ id });
    }
}
