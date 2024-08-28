import { HashProvider } from "../../../shared/application/providers/hash-provider";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserOutput, UserOutputMapper } from "../dtos/user-output.dto";
import { BadRequestError } from "../../../shared/application/errors/bad-request-error";
import { UseCase as DefaultUseCase } from "../../../shared/application/usecases/use-case";
import { InvalidCredentialsError } from "../../../shared/application/errors/invalid-credentials-error";

export namespace SigninUseCase {
    export type Input = {
        email: string;
        password: string;
    }

    export type Output = UserOutput;

    export class UseCase implements DefaultUseCase<Input, Output>{
        constructor(
            private userRepository: UserRepository.Repository,
            private hashProvider: HashProvider,
        ){}

        async execute(input: Input): Promise<Output> {
            const { email, password } = input;
            if(!email || !password ) throw new BadRequestError("Input data not provided");

            const entity = await this.userRepository.findByEmail(email);

            const hashPasswordMatch = await this.hashProvider.compareHash(password, entity.password);

            if(!hashPasswordMatch) {
                throw new InvalidCredentialsError("Invalid Credentials");
            }

            return UserOutputMapper.toOutput(entity);
        }
    }
}
