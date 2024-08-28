import { BadRequestError } from "../../../shared/application/errors/bad-request-error";
import { UseCase as DefaultUseCase } from "../../../shared/application/usecases/use-case";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserOutput, UserOutputMapper } from "../dtos/user-output.dto";

export namespace UpdateUser {
    export type Input = {
        id: string;
        name: string;
    }

    export type Output = UserOutput;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private userRepository: UserRepository.Repository) {}
        async execute(input: Input): Promise<UserOutput> {
            if(!input.name) throw new BadRequestError("Name not provided");

            const entity = await this.userRepository.findById(input.id);

            entity.update(input.name);
            await this.userRepository.update(entity);

            return UserOutputMapper.toOutput(entity);
        }
    }
}
