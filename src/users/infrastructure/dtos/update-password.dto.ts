import { UpdatePassword } from "../../application/usecases/update-password.usecase";

export class UpdatePasswordDto implements Omit<UpdatePassword.Input, "id"> {
    password: string;
    oldPassword: string;
}
