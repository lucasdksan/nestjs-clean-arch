import { IsNotEmpty, IsString } from "class-validator";
import { UpdatePassword } from "../../application/usecases/update-password.usecase";

export class UpdatePasswordDto implements Omit<UpdatePassword.Input, "id"> {
    @IsString()
    @IsNotEmpty()
    password: string;
    oldPassword: string;
}
