import "reflect-metadata";
import { closeTestingConnections, createTestingConnections, reloadTestingDatabases } from "../../utils/test-utils";
import { Connection } from "../../../src/connection/Connection";
import { expect } from "chai";
import { Account } from "./entity/Post";
// import { PostgresDriver } from "../../../src/driver/postgres/PostgresDriver";

describe("github issues > #2128 salesfoce", () => {

    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    }));
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should be able to resolve value functions", () => Promise.all(connections.map(async connection => {
        const AccountRepository = connection.manager.getRepository(Account);

        const accounts = await AccountRepository.find()
        expect(accounts.length).to.be.greaterThan(0, 'we got users!')

        const count = await AccountRepository.createQueryBuilder().getCount()
        expect(count).to.be.equal(36, 'right count!')

        console.log('testing', 'accounts', accounts);

    })));

});
