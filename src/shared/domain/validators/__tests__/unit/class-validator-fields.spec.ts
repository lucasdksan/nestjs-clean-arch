import { ClassValidatorFields } from "../../class-validator-fields";
import * as libClassValidator from "class-validator";

class StubClassValidatorFields extends ClassValidatorFields<{field: string}> {

}

describe("ClassValidatorFields unit test", ()=>{
    it("Should initialize errors and validated Data variables with null.", ()=>{
        const sut = new StubClassValidatorFields();

        expect(sut.errors).toBeNull();
        expect(sut.validatedData).toBeNull();
    });

    it("Should validate with errors.", async ()=>{
        const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
        const sut = new StubClassValidatorFields();

        spyValidateSync.mockReturnValue([{
            property: "field", constraints: { isRequired: "test error" }
        }]);

        expect(sut.validate(null)).toBeFalsy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(sut.validatedData).toBeNull();
        expect(sut.errors).toStrictEqual({ field: ["test error"] });
    });

    it("Should validate without errors.", async ()=>{
        const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
        const sut = new StubClassValidatorFields();

        spyValidateSync.mockReturnValue([{
            property: "field", constraints: { isRequired: "test error" }
        }]);

        expect(sut.validate({ field: "value" })).toBeTruthy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(sut.validatedData).toStrictEqual({ field: "value" });
        expect(sut.errors).toBeNull();
    });
});
