import { Controller, Get, INestApplication } from "@nestjs/common";
import request from "supertest";
import { InvalidCredentialsError } from "../../../../../application/errors/invalid-credentials-error";
import { Test, TestingModule } from "@nestjs/testing";
import { InvalidCredentialsErrorFilter } from "../../invalid-credentials-error.filter";

@Controller("stub")
class StubController {
    @Get()
    index() {
        throw new InvalidCredentialsError("Invalid credentials");
    }
}

describe("InvalidCredentialsErrorFilter e2e tests", () => {
    let app: INestApplication;
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [StubController],
        }).compile();
        app = module.createNestApplication();
        app.useGlobalFilters(new InvalidCredentialsErrorFilter());
        await app.init();
    }, 10000);

    it("should be defined", () => {
        expect(new InvalidCredentialsErrorFilter()).toBeDefined();
    });

    it("should catch a InvalidCredentialsError", () => {
        return request(app.getHttpServer()).get("/stub").expect(400).expect({
            statusCode: 400,
            error: "Bad Request",
            message: "Invalid credentials",
        });
    });
});
