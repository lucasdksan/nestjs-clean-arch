import { IsNotEmpty, IsString } from "class-validator";
import { UpdateUser } from "../../application/usecases/update-user.usecase";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto implements Omit<UpdateUser.Input, "id"> {
    @ApiProperty({
        description: "Dado a ser alterado do usuário"
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
