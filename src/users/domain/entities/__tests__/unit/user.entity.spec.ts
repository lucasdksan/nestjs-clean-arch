import { UserEntity, UserProps } from "../../user.entity";
import { UserDataBuilder } from "../../../testing/helpers/user-data-builder";

describe("UserEntity unit tests", ()=>{
    let props: UserProps;
    let sut: UserEntity;

    beforeEach(()=>{
        UserEntity.validate = jest.fn();
        props = UserDataBuilder({});

        sut = new UserEntity(props);
    });

    it("Contructor Method", ()=>{
        expect(UserEntity.validate).toHaveBeenCalled();
        expect(sut.props.name).toEqual(props.name);
        expect(sut.props.email).toEqual(props.email);
        expect(sut.props.password).toEqual(props.password);
        expect(sut.props.createdAt).toBeInstanceOf(Date);
    });

    it("Getter of name field", ()=>{
        expect(sut.props.name).toBeDefined();
        expect(sut.props.name).toEqual(props.name);
        expect(typeof sut.props.name).toBe("string");
    });

    it("Setter of name field", ()=>{
        sut["name"] = "Other name";
        expect(sut.props.name).toEqual("Other name");
        expect(typeof sut.props.name).toBe("string");
    });

    it("Should update a user", ()=>{
        expect(UserEntity.validate).toHaveBeenCalled();
        sut.update("Other name");
        expect(sut.props.name).toEqual("Other name");
    });

    it("Getter of email field", ()=>{
        expect(sut.props.email).toBeDefined();
        expect(sut.props.email).toEqual(props.email);
        expect(typeof sut.props.email).toBe("string");
    });


    it("Getter of password field", ()=>{
        expect(sut.props.password).toBeDefined();
        expect(sut.props.password).toEqual(props.password);
        expect(typeof sut.props.password).toBe("string");
    });

    it("Should update the password field", ()=>{
        expect(UserEntity.validate).toHaveBeenCalled();
        sut.updatePassword("Otherp");
        expect(sut.props.password).toEqual("Otherp");
    });

    it("Setter of password field", ()=>{
        sut["password"] = "Otherp";
        expect(sut.props.password).toEqual("Otherp");
        expect(typeof sut.props.password).toBe("string");
    });

    it("Getter of createdAt field", ()=>{
        expect(sut.props.createdAt).toBeDefined();
        expect(sut.props.createdAt).toBeInstanceOf(Date);
    });
});
