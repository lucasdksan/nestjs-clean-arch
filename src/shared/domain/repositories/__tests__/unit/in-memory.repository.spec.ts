import { Entity } from "../../../entity/entity";
import { InMemoryRepository } from "../../in-memory.repository";

type StubEntityProps = {
    name: string;
    price: number;
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository", () => {
    let sut: StubInMemoryRepository;

    beforeEach(()=>{
        sut = new StubInMemoryRepository();
    });

    it("Should insert a new entity",async ()=>{
        const entity = new StubEntity({ name: "Algo", price: 100 });

        await sut.insert(entity);

        expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON());
    });
});
