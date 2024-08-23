import { UserDataBuilder } from "../../../testing/helpers/user-data-builder";
import { UserRules, UserValidator, UserValidatorFactory } from "../../user.validator";

describe("UserValidator integration test", () => {
    let sut: UserValidator;
    const props = UserDataBuilder({});

    beforeEach(() => {
        sut = UserValidatorFactory.create();
    });

    it("Valid case for user validator class", ()=> {
        const isValid = sut.validate(props);

        expect(isValid).toBeTruthy();
        expect(sut.validatedData).toStrictEqual(new UserRules(props));
    });

    describe("Name Field", ()=> {
        it("Invalidation cases for name field", () => {
            let isValid = sut.validate(null as any);

            expect(isValid).toBeFalsy();
            expect(sut.errors["name"]).toStrictEqual([
                "name should not be empty",
                "name must be a string",
                "name must be shorter than or equal to 255 characters",
            ]);

            isValid = sut.validate({
                ...UserDataBuilder({}),
                name: "" as any
            });

            expect(isValid).toBeFalsy();
            expect(sut.errors["name"]).toStrictEqual([
                "name should not be empty"
            ]);

            isValid = sut.validate({
                ...UserDataBuilder({}),
                name: 190283 as any
            });

            expect(isValid).toBeFalsy();
            expect(sut.errors["name"]).toStrictEqual([
                "name must be a string",
                "name must be shorter than or equal to 255 characters",
            ]);

            isValid = sut.validate({
                ...UserDataBuilder({}),
                name: "asd".repeat(256) as any
            });

            expect(isValid).toBeFalsy();
            expect(sut.errors["name"]).toStrictEqual([
                "name must be shorter than or equal to 255 characters",
            ]);
        });
    });

    describe("Email Field", ()=> {
        it("Invalidation cases for email field", () => {
            let isValid = sut.validate(null as any);

            expect(isValid).toBeFalsy();
            expect(sut.errors["email"]).toStrictEqual([
                "email should not be empty",
                "email must be a string",
                "email must be shorter than or equal to 255 characters",
                "email must be an email",
            ]);

            isValid = sut.validate({
                ...UserDataBuilder({}),
                email: "" as any
            });

            expect(isValid).toBeFalsy();
            expect(sut.errors["email"]).toStrictEqual([
                "email should not be empty",
                "email must be an email"
            ]);

            isValid = sut.validate({
                ...UserDataBuilder({}),
                email: 190283 as any
            });

            expect(isValid).toBeFalsy();
            expect(sut.errors["email"]).toStrictEqual([
                "email must be a string",
                "email must be shorter than or equal to 255 characters",
                "email must be an email",
            ]);

            isValid = sut.validate({
                ...UserDataBuilder({}),
                email: "asd".repeat(256) as any
            });

            expect(isValid).toBeFalsy();
            expect(sut.errors["email"]).toStrictEqual([
                "email must be shorter than or equal to 255 characters",
                "email must be an email",
            ]);
        });
    });

    describe("Password Field", ()=> {
        it("Invalidation cases for password field", () => {
            let isValid = sut.validate(null as any);

            expect(isValid).toBeFalsy();
            expect(sut.errors["password"]).toStrictEqual([
                "password should not be empty",
                "password must be a string",
                "password must be shorter than or equal to 100 characters",
            ]);

            isValid = sut.validate({
                ...UserDataBuilder({}),
                password: "" as any
            });

            expect(isValid).toBeFalsy();
            expect(sut.errors["password"]).toStrictEqual([
                "password should not be empty"
            ]);

            isValid = sut.validate({
                ...UserDataBuilder({}),
                password: 190283 as any
            });

            expect(isValid).toBeFalsy();
            expect(sut.errors["password"]).toStrictEqual([
                "password must be a string",
                "password must be shorter than or equal to 100 characters",
            ]);

            isValid = sut.validate({
                ...UserDataBuilder({}),
                password: "asd".repeat(256) as any
            });

            expect(isValid).toBeFalsy();
            expect(sut.errors["password"]).toStrictEqual([
                "password must be shorter than or equal to 100 characters",
            ]);
        });
    });

    describe("CreatedAt Field", ()=> {
        it("Invalidation cases for createdAt field", ()=> {
            let isValid = sut.validate({ ...props, createdAt: 10 as any });

            expect(isValid).toBeFalsy();
            expect(sut.errors["createdAt"]).toStrictEqual([
                "createdAt must be a Date instance",
            ]);

            isValid = sut.validate({ ...props, createdAt: "asdqdasd" as any });

            expect(isValid).toBeFalsy();
            expect(sut.errors["createdAt"]).toStrictEqual([
                "createdAt must be a Date instance",
            ]);
        });
    });
});
