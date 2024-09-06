import { Transform } from "class-transformer";
import { UserOutput } from "../../application/dtos/user-output.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserPresenter {
    @ApiProperty({
        description: "Identificação do usuário"
    })
    id: string;

    @ApiProperty({
        description: "Nomde do usuário"
    })
    name: string;

    @ApiProperty({
        description: "Email do usuário"
    })
    email: string;

    @ApiProperty({
        description: "Data de criação do usuário"
    })
    @Transform(({ value }: { value: Date })=> value.toISOString())
    createdAt: Date;

    constructor(output: UserOutput){
        this.id = output.id;
        this.name = output.name;
        this.email = output.email;
        this.createdAt = output.createdAt;
    }
}
