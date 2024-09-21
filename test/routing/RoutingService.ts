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

/*
@Test
public void testABFound() {
    List<Edge> path = finder.findPath(graph.findVertex("a"), graph.findVertex("b"));
    assertNotNull(path);
    assertEquals(1, path.size());
}

@Test
public void testBANotFound() {
    List<Edge> path = finder.findPath(graph.findVertex("b"), graph.findVertex("a"));
    assertNull(path);
}

@Test
public void testACFoundWithCorrectOrder() {
    List<Edge> path = finder.findPath(graph.findVertex("a"), graph.findVertex("c"));
    assertNotNull(path);
    assertEquals(2, path.size());

    int index = 0;
    {
        Edge edge = path.get(index++);
        assertEquals("a", edge.getSource().getId());
        assertEquals("b", edge.getTarget().getId());
    }
    {
        Edge edge = path.get(index++);
        assertEquals("b", edge.getSource().getId());
        assertEquals("c", edge.getTarget().getId());
    }
}
*/
