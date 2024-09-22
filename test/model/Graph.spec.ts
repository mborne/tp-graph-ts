import "mocha";
import { expect } from "chai";
import { createTestGraph01 } from "../helpers";

describe("test Graph", () => {

    describe("test findVertexById", () => {

        it("should find 'a'", () => {
            const g = createTestGraph01();
            const a = g.findVertexById('a');
            expect(a).to.be.not.null;
            expect(a.id).to.equals('a');
        });

        it("should throw Error for 'missing-vertex'", () => {
            const g = createTestGraph01();
            expect(() => {
                g.findVertexById('missing-vertex')
            }).to.throw("vertex with id=missing-vertex not found");
        });
    });

    describe("test findVertexByCoordinate", () => {

        it("should find 'b' for [1.0, 0.0]", () => {
            const g = createTestGraph01();
            const b = g.findVertexByCoordinate([1.0, 0.0]);
            expect(b).to.be.not.null;
            expect(b.id).to.equals('b');
        });

        it("should throw Error for [2.0, 2.0]", () => {
            const g = createTestGraph01();
            expect(() => {
                g.findVertexByCoordinate([2.0, 2.0])
            }).to.throw("vertex with coordinate=[2,2] not found");
        });
    });


    describe("test getOutEdges", () => {

        it("should find 'ab' and 'ad' for 'a'", () => {
            const g = createTestGraph01();
            const a = g.findVertexById('a');
            const edges = g.getOutEdges(a);
            expect(edges.length).to.equal(2);
            const edgeNames = edges.map((edge) => edge.id);
            expect(edgeNames).to.include('ab');
            expect(edgeNames).to.include('ad');
        });

        it("should return an empty array for 'd'", () => {
            const g = createTestGraph01();
            const d = g.findVertexById('d');
            const edges = g.getOutEdges(d);
            expect(edges.length).to.equal(0);
        });

    });


    describe("test getInEdges", () => {

        it("should find 'ab' for 'b'", () => {
            const g = createTestGraph01();
            const a = g.findVertexById('b');
            const edges = g.getInEdges(a);
            expect(edges.length).to.equal(1);
            expect(edges[0].id).to.equal('ab');
        });

        it("should return an empty array for 'a'", () => {
            const g = createTestGraph01();
            const a = g.findVertexById('a');
            const edges = g.getInEdges(a);
            expect(edges.length).to.equal(0);
        });

    });

    describe("test getOrCreateVertex", () => {

        it("should not duplicate vertex", () => {
            const g = createTestGraph01();
            const a = g.getOrCreateVertex([0.0,0.0]);
            const b = g.getOrCreateVertex([0.0,0.0]);
            expect(a === b).to.be.true;
        });

    });

});
