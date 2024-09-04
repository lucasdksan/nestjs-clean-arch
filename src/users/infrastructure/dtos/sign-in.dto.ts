import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Signin } from "../../application/usecases/sign-in.usecase";

export class SigninDto implements Signin.Input {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
