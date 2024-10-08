import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { ClassValidatorFields } from "../../class-validator-fields";

class StubRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    constructor(data: any) {
        Object.assign(this, data);
    }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
    validate(data: any): boolean {
        return super.validate(new StubRules(data));
    }
}

describe("ClassValidatorFields integration test", () => {
    let sut: StubClassValidatorFields;

    beforeEach(() => {
        sut = new StubClassValidatorFields();
    });

    it("Should validate with errors", () => {
        expect(sut.validate(null)).toBeFalsy();
        expect(sut.errors).toStrictEqual({
            name: [
                "name should not be empty",
                "name must be a string",
                "name must be shorter than or equal to 255 characters",
            ],
            price: [
                "price should not be empty",
                "price must be a number conforming to the specified constraints",
            ],
        });
    });

    it("Should validate without errors", ()=>{
        expect(sut.validate({ name: "arroz", price: 100 })).toBeTruthy();
        expect(sut.validatedData).toStrictEqual(new StubRules({ name: "arroz", price: 100 }));
    });
});
