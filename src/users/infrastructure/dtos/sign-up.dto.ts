import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Signup } from "../../application/usecases/sign-up.usecase";

export class SignupDto implements Signup.Input {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
