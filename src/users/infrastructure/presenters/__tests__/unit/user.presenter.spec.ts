import { instanceToInstance } from "class-transformer";
import { UserPresenter } from "../../user.presenter";

describe("User Presenter unit test", ()=>{
    const createdAt = new Date();

    let sut: UserPresenter;

    let props = {
        id: "0c7d61a1-54b4-4c61-bc69-0d2e0ab34ab7",
        name: "test name",
        email: "a@a.gmail.com",
        password: "f1231sada#$$as",
        createdAt
    }

    beforeEach(()=>{
        sut = new UserPresenter(props);
    });

    describe("Constructor", ()=>{
        it("should be defined", ()=>{
            expect(sut.id).toEqual(props.id);
            expect(sut.name).toEqual(props.name);
            expect(sut.email).toEqual(props.email);
            expect(sut.createdAt).toEqual(props.createdAt);
        });
    });


    it("should presenter data", ()=>{
        const output = instanceToInstance(sut);

        expect(output).toStrictEqual({
            id: "0c7d61a1-54b4-4c61-bc69-0d2e0ab34ab7",
            name: "test name",
            email: "a@a.gmail.com",
            createdAt: createdAt.toISOString()
        });
    });
});
