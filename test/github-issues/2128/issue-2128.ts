import "reflect-metadata";
import { closeTestingConnections, createTestingConnections, reloadTestingDatabases } from "../../utils/test-utils";
import { Connection } from "../../../src/connection/Connection";
import { expect } from "chai";
import { Opportunity, TypeEnum } from "./entity/Post";
// import { PostgresDriver } from "../../../src/driver/postgres/PostgresDriver";

describe("github issues > #2128 salesfoce", () => {

    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    }));
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));


    it("opportunity", () => Promise.all(connections.map(async connection => {
        const Repository = connection.manager.getRepository(Opportunity);

        const opps = await Repository.find({ take: 10, skip: 2 })
        expect(opps.length).to.be.greaterThan(0, 'we got users!')

        const count = await Repository.createQueryBuilder().getCount()
        expect(count).to.be.equal(51, 'right count!')

        console.log('testing', 'accounts', opps);

        const x = {
            enum0: TypeEnum.Existing_Business,
            enum1: TypeEnum.New_Business,
        }
        console.log('testing', 'x', x);

        const y = opps.filter(o => o.Type === TypeEnum.New_Business)
        console.log('testing', 'y', y);
        const z = opps.filter(o => o.Type === TypeEnum.Existing_Business)
        console.log('testing', 'z', z);

    })));

});
