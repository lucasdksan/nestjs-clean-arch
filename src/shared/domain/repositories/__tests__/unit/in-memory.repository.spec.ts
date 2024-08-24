import { Entity } from "../../../entity/entity";
import { NotFoundError } from "../../../errors/not-found-error";
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

    it("Should throw error when entity not found",async ()=>{
        await expect(sut.findById("dasdasda")).rejects.toThrow(new NotFoundError("Entity not found"));
    });

    it("Should find a entity by id",async ()=>{
        const entity = new StubEntity({ name: "Algo", price: 100 });

        await sut.insert(entity);

        const result = await sut.findById(entity.id);

        expect(entity.toJSON()).toStrictEqual(result.toJSON());
    });

    it("Should returns all entities",async ()=>{
        const entity = new StubEntity({ name: "Algo", price: 100 });

        await sut.insert(entity);

        const result = await sut.findAll();

        expect([entity]).toStrictEqual(result);
    });

    it("Should throw error on update when entity not found", async ()=>{
        const entity = new StubEntity({ name: "Algo", price: 100 });

        await expect(sut.update(entity)).rejects.toThrow(new NotFoundError("Entity not found"));
    });

    it("Should throw error on update when entity not found", async ()=>{
        const entity = new StubEntity({ name: "Algos", price: 100 });
        await sut.insert(entity);
        const entityUpdated = new StubEntity({ name: "Algos", price: 100 }, entity.id);
        await sut.update(entityUpdated);

        expect(entityUpdated.toJSON()).toStrictEqual(sut.items[0].toJSON());
    });
});
