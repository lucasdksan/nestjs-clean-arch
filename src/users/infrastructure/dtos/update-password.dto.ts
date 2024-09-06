import { IsNotEmpty, IsString } from "class-validator";
import { UpdatePassword } from "../../application/usecases/update-password.usecase";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordDto implements Omit<UpdatePassword.Input, "id"> {
    @ApiProperty({
        description: "Nova senha do usuário"
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: "Senha antiga do usuário"
    })
    @IsString()
    @IsNotEmpty()
    oldPassword: string;
}
