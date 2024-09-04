import { IsOptional } from "class-validator";
import { SortDirection } from "../../../shared/domain/repositories/searchable-repository-contracts";
import { ListUsers } from "../../application/usecases/list-users.usecase";

export class ListUsersDto implements ListUsers.Input {
    @IsOptional()
    page?: number;

    @IsOptional()
    perPage?: number;

    @IsOptional()
    sort?: string;

    @IsOptional()
    sortDir?: SortDirection;

    @IsOptional()
    filter?: string;
}
