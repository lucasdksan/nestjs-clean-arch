import { UpdateUser } from "../../application/usecases/update-user.usecase";

export class UpdateUserDto implements Omit<UpdateUser.Input, "id"> {
    name: string;
}
