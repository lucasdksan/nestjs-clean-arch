import { Signin } from "../../application/usecases/sign-in.usecase";

export class SigninDto implements Signin.Input {
    email: string;
    password: string;
}
