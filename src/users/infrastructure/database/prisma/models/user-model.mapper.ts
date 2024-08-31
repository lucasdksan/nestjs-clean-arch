import { User } from "@prisma/client";
import { UserEntity } from "../../../../domain/entities/user.entity";
import { ValidationError } from "../../../../../shared/domain/errors/validation-error";

export class UserModelMapper {
    static toEntity(model: User){
        const data = {
            name: model.name,
            email: model.email,
            password: model.password,
            createdAt: model.createdAt
        };

        try {
            return new UserEntity(data, model.id);
        } catch(err) {
            throw new ValidationError("An entity not be loaded");
        }
    }
}
