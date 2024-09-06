import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Signin } from "../../application/usecases/sign-in.usecase";
import { ApiProperty } from "@nestjs/swagger";

export class SigninDto implements Signin.Input {
    @ApiProperty({
        description: "Email do usuário"
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Senha do usuário"
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
