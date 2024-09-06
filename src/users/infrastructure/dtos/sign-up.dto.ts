import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Signup } from "../../application/usecases/sign-up.usecase";
import { ApiProperty } from "@nestjs/swagger";

export class SignupDto implements Signup.Input {
    @ApiProperty({
        description: "Nome do usuário"
    })
    @IsString()
    @IsNotEmpty()
    name: string;

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
