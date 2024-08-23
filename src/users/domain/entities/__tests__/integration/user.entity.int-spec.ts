import { EntityValidationError } from "@/shared/domain/errors/validation-error";
import { UserDataBuilder } from "../../../testing/helpers/user-data-builder";
import { UserEntity, UserProps } from "../../user.entity";

describe("UserEntity Integration Tests", ()=>{
    describe("Constructor method", ()=> {
        it("Should throw an error when creating a user with invalid name", ()=> {
            let props: UserProps = {
                ...UserDataBuilder({}),
                name: null
            }

            expect(()=> new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...UserDataBuilder({}),
                name: ""
            }

            expect(()=> new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...UserDataBuilder({}),
                name: "as".repeat(256)
            }

            expect(()=> new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...UserDataBuilder({}),
                name: 12312 as any
            }

            expect(()=> new UserEntity(props)).toThrowError(EntityValidationError);
        });

        it("Should throw an error when creating a user with invalid email", ()=> {
            let props: UserProps = {
                ...UserDataBuilder({}),
                email: null
            }

            expect(()=> new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...UserDataBuilder({}),
                email: ""
            }

            expect(()=> new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...UserDataBuilder({}),
                email: "as".repeat(256)
            }

            expect(()=> new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...UserDataBuilder({}),
                email: 12312 as any
            }

            expect(()=> new UserEntity(props)).toThrowError(EntityValidationError);
        });

        it("Should throw an error when creating a user with invalid password", ()=> {
            let props: UserProps = {
                ...UserDataBuilder({}),
                password: null
            }

            expect(()=> new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...UserDataBuilder({}),
                password: ""
            }

            expect(()=> new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...UserDataBuilder({}),
                password: "as".repeat(101)
            }

            expect(()=> new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...UserDataBuilder({}),
                password: 12312 as any
            }

            expect(()=> new UserEntity(props)).toThrowError(EntityValidationError);
        });

        it("Should throw an error when creating a user with invalid createdAt", ()=> {
            let props: UserProps = {
                ...UserDataBuilder({}),
                createdAt: "asdasdsa" as any
            }

            expect(()=> new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...UserDataBuilder({}),
                createdAt: 12312 as any
            }

            expect(()=> new UserEntity(props)).toThrowError(EntityValidationError);
        });

        it("Should a valid user", ()=> {
            expect.assertions(0);

            let props: UserProps = {
                ...UserDataBuilder({})
            }

            new UserEntity(props);
        });
    });

    describe("Update method", ()=>{
        it("Should throw an error when update a user with invalid name", ()=> {
            const entity = new UserEntity(UserDataBuilder({}));

            expect(()=> entity.update("")).toThrowError(EntityValidationError);
            expect(()=> entity.update(null)).toThrowError(EntityValidationError);
            expect(()=> entity.update(10 as any)).toThrowError(EntityValidationError);
            expect(()=> entity.update("a".repeat(256))).toThrowError(EntityValidationError);
        });

        it("Should a valid user", ()=> {
            expect.assertions(0);

            let props: UserProps = {
                ...UserDataBuilder({})
            }

            const entity = new UserEntity(props);
            entity.update("Other name.");
        });
    });

    describe("Update password method", ()=> {
        it("Should a invalid user using password field", ()=> {
            const entity = new UserEntity(UserDataBuilder({}));

            expect(()=> entity.updatePassword("")).toThrowError(EntityValidationError);
            expect(()=> entity.updatePassword(null)).toThrowError(EntityValidationError);
            expect(()=> entity.updatePassword(10 as any)).toThrowError(EntityValidationError);
            expect(()=> entity.updatePassword("a".repeat(256))).toThrowError(EntityValidationError);
        });

        it("Should a valid user", ()=> {
            expect.assertions(0);

            let props: UserProps = {
                ...UserDataBuilder({})
            }

            const entity = new UserEntity(props);
            entity.updatePassword("Other name.");
        });
    });
});
