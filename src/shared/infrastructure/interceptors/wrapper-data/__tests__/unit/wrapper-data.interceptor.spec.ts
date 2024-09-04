import { of } from "rxjs";
import { WrapperDataInterceptor } from "../../wrapper-data.interceptor";

describe("Wrapper Data Interceptor Unit test", () => {
    let interceptor: WrapperDataInterceptor;
    let props: any;

    beforeEach(() => {
        interceptor = new WrapperDataInterceptor();
        props = {
            name: "test name",
            email: "a@a.com",
            password: "1234A!2@"
        }
    });

    it("should be defined", () => {
        expect(interceptor).toBeDefined();
    });

    it("should wrapper with data key", () => {
        const obs$ = interceptor.intercept({} as any, { handle: () => of(props), });

        obs$.subscribe({
            next: value => {
                expect(value).toEqual({ data: props });
            }
        });
    });

    it("shouldn't wrapper when meta key is present", () => {
        const result = { data: [props], meta: { total: 1 } };
        const obs$ = interceptor.intercept({} as any, {
            handle: () => of(result),
        });

        obs$.subscribe({
            next: value => {
                expect(value).toEqual(result)
            },
        });
    });
});
