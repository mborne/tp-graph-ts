import Coordinate from "./Coordinate";
import { Edge } from "./Edge";
import { VertexNotFound } from "../errors/VertexNotFound";
import { Vertex } from "./Vertex";

/**
 * An oriented graph with its vertices and edges.
 */
export class Graph {
    vertices: Vertex[];
    edges: Edge[];

    constructor() {
        this.vertices = [];
        this.edges = [];
    }

    /**
     * Get out edges for a given vertex
     */
    getOutEdges(vertex: Vertex): Edge[] {
        const result: Edge[] = [];
        for (const edge of this.edges) {
            if (edge.source == vertex) {
                result.push(edge);
            }
        }
        return result;
    }

    /**
     * Get in edges for a given vertex
     */
    getInEdges(vertex: Vertex): Edge[] {
        const result: Edge[] = [];
        for (const edge of this.edges) {
            if (edge.target == vertex) {
                result.push(edge);
            }
        }
        return result;
    }

    /**
     * Find a vertex by identifier
     */
    findVertexById(id: string): Vertex {
        for (const vertex of this.vertices) {
            if (vertex.id == id) {
                return vertex;
            }
        }
        throw new VertexNotFound(`vertex with id=${id} not found`);
    }

    findVertexByCoordinate(c: Coordinate): Vertex {
        for (const vertex of this.vertices) {
            if (vertex.coordinate[0] == c[0] && vertex.coordinate[1] == c[1]) {
                return vertex;
            }
        }
        throw new VertexNotFound(`vertex with coordinate=${JSON.stringify(c)} not found`);
    }

}
