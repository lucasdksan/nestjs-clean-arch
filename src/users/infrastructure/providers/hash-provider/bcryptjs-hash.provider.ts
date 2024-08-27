import { compare, hash, genSalt } from "bcryptjs";
import { HashProvider } from "../../../../shared/application/providers/hash-provider";

export class BcryptjsHashProvider implements HashProvider {
    async generateHash(payload: string): Promise<string> {
        const salt = await genSalt();

        return hash(payload, salt);
    }

    async compareHash(payload: string, hash: string): Promise<boolean> {
        return compare(payload, hash);
    }

}
