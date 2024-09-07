import { instanceToInstance, instanceToPlain } from "class-transformer";
import { PaginationPresenter } from "../../pagination.presenter";

describe("Pagination Presenter unit test", () => {
    const createdAt = new Date();

    describe("Constructor", () => {
        it("should set values", ()=>{
            const props = {
                currentPage: 1,
                perPage: 2,
                lastPage: 3,
                total: 4
            };

            const sut = new PaginationPresenter(props);

            expect(sut.currentPage).toEqual(props.currentPage);
            expect(sut.lastPage).toEqual(props.lastPage);
            expect(sut.perPage).toEqual(props.perPage);
            expect(sut.total).toEqual(props.total);
        });

        it("should set values", ()=>{
            const props = {
                currentPage: "1" as any,
                perPage: "2" as any,
                lastPage: "3" as any,
                total: "4" as any
            };

            const sut = new PaginationPresenter(props);

            expect(sut.currentPage).toEqual(props.currentPage);
            expect(sut.lastPage).toEqual(props.lastPage);
            expect(sut.perPage).toEqual(props.perPage);
            expect(sut.total).toEqual(props.total);
        });
    });


    it("should presenter data", () => {
        let sut = new PaginationPresenter({
            currentPage: 1,
            perPage: 2,
            lastPage: 3,
            total: 4
        });
        let output = instanceToPlain(sut);

        expect(output).toStrictEqual({
            currentPage: 1,
            perPage: 2,
            lastPage: 3,
            total: 4
        });

        sut = new PaginationPresenter({
            currentPage: "1" as any,
            perPage: "2" as any,
            lastPage: "3" as any,
            total: "4" as any
        });
        output = instanceToPlain(sut);

        expect(output).toStrictEqual({
            currentPage: 1,
            perPage: 2,
            lastPage: 3,
            total: 4
        });
    });
});
