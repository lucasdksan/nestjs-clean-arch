import { Signup } from "../../application/usecases/sign-up.usecase";

export class SignupDto implements Signup.Input {
    name: string;
    email: string;
    password: string;
}
