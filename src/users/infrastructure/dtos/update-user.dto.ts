import { IsNotEmpty, IsString } from "class-validator";
import { UpdateUser } from "../../application/usecases/update-user.usecase";

export class UpdateUserDto implements Omit<UpdateUser.Input, "id"> {
    @IsString()
    @IsNotEmpty()
    name: string;
}
