import "mocha";
import { expect } from "chai";
import { createTestGraph01 } from "../helpers";
import { RoutingService } from "../../src/routing/RoutingService";

describe("test RoutingService", () => {

    describe("test with sample-graph-01 ...", () => {

        // TODO : leave a bug and ask for fix?
        it("should return an empty route from a to a", () => {
            const g = createTestGraph01();
            const routing = new RoutingService(g);
            const route = routing.findRoute(
                g.findVertexById('a'),
                g.findVertexById('a')
            );
            expect(route).to.be.not.null;
            expect(route.length).to.equal(0);
        });

        it("should find [ab] from a to b", () => {
            const g = createTestGraph01();
            const routing = new RoutingService(g);
            const route = routing.findRoute(
                g.findVertexById('a'),
                g.findVertexById('b')
            );
            expect(route).to.be.not.null;
            expect(route.length).to.equal(1);
            expect(route[0].id).to.equal('ab');
        });

        it("should find [ab,bc] from a to c", () => {
            const g = createTestGraph01();
            const routing = new RoutingService(g);
            const route = routing.findRoute(
                g.findVertexById('a'),
                g.findVertexById('c')
            );
            expect(route).to.be.not.null;
            expect(route.length).to.equal(2);
            expect(route[0].id).to.equal('ab');
            expect(route[1].id).to.equal('bc');
        });

        it("shouldn't find path from c to a", () => {
            const g = createTestGraph01();
            const routing = new RoutingService(g);
            expect(() => {
                routing.findRoute(
                    g.findVertexById('c'),
                    g.findVertexById('a')
                )
            }).to.throw("no route found from 'c' to 'a'");
        });

        it("shouldn't find path from b to a", () => {
            const g = createTestGraph01();
            const routing = new RoutingService(g);
            expect(() => {
                routing.findRoute(
                    g.findVertexById('b'),
                    g.findVertexById('a')
                )
            }).to.throw("no route found from 'b' to 'a'");
        });

    });

});
