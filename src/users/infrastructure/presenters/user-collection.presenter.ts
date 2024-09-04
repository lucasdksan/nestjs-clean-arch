import { CollectionPresenter } from "../../../shared/infrastructure/presenters/collection.presenter";
import { ListUsers } from "../../application/usecases/list-users.usecase";
import { UserPresenter } from "./user.presenter";

export class UserCollectionPresenter extends CollectionPresenter {
    data: UserPresenter[];

    constructor(output: ListUsers.Output){
        const { items, ...paginationProps } = output;

        super(paginationProps);
        this.data = items.map(item => new UserPresenter(item));
    }
}
