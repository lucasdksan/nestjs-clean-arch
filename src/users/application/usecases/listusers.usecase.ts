import { SearchInput } from "../../../shared/dtos/search-input.dto";
import { UseCase as DefaultUseCase } from "../../../shared/application/usecases/use-case";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserOutput, UserOutputMapper } from "../dtos/user-output.dto";
import { PaginationOutput, PaginationOutputMapper } from "../../../shared/dtos/pagination-output.dto";

export namespace ListUsers {
    export type Input = SearchInput;

    export type Output = PaginationOutput<UserOutput>;

    export class UseCase implements DefaultUseCase<Input, Output>{
        constructor(private userRepository: UserRepository.Repository){}

        async execute(input: Input): Promise<Output>{
            const params = new UserRepository.SearchParams(input);
            const searchResult = await this.userRepository.search(params);

            return this.toOutput(searchResult);
        }

        private toOutput(searchResult: UserRepository.SearchResult): Output{
            const items = searchResult.items.map((item)=> {
                return UserOutputMapper.toOutput(item);
            });

            return PaginationOutputMapper.toOutput(items, searchResult);
        }
    }
}
