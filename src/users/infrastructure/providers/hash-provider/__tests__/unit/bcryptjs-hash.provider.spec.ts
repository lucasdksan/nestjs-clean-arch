import { BcryptjsHashProvider } from "../../bcryptjs-hash.provider"

describe("Bcryptjs unit test", ()=> {
    let sut: BcryptjsHashProvider;

    beforeEach(()=>{
        sut = new BcryptjsHashProvider();
    });

    it("Should return encrypted password", async ()=>{
        const password = "Apenasumtest123@!";
        const hash = await sut.generateHash(password);

        expect(hash).toBeDefined();
    });

    it("Should return false on invalid password and hash comparison", async ()=>{
        const password = "Apenasumtest123@!";
        const hash = await sut.generateHash(password);
        const result = await sut.compareHash("faskesssda!", hash);

        expect(result).toBeFalsy();
    });

    it("Should return true on invalid password and hash comparison", async ()=>{
        const password = "Apenasumtest123@!";
        const hash = await sut.generateHash(password);
        const result = await sut.compareHash(password, hash);

        expect(result).toBeTruthy();
    });
})
