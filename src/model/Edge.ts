import { Vertex } from "./Vertex";

/**
 * An edge with its source and target
 */
export class Edge {
    id: string;
    source: Vertex;
    target: Vertex;

    getCost() {
        // TODO : distance
        return 1.0;
    }
}
