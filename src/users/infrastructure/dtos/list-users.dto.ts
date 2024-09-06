import { IsOptional } from "class-validator";
import { SortDirection } from "../../../shared/domain/repositories/searchable-repository-contracts";
import { ListUsers } from "../../application/usecases/list-users.usecase";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class ListUsersDto implements ListUsers.Input {
    @ApiPropertyOptional({
        description: "Página que será retornada"
    })
    @IsOptional()
    page?: number;

    @ApiPropertyOptional({
        description: "Quantidade de registro por página"
    })
    @IsOptional()
    perPage?: number;

    @ApiPropertyOptional({
        description: "Coluna definida para ordenar os dados: 'Name' ou 'createdAt' "
    })
    @IsOptional()
    sort?: string;

    @ApiPropertyOptional({
        description: "Ordenação dos dados: crescente ou decrescente"
    })
    @IsOptional()
    sortDir?: SortDirection;

    @ApiPropertyOptional({
        description: "Filtro dos dados"
    })
    @IsOptional()
    filter?: string;
}
