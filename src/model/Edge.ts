import { LineString } from "geojson";
import { Vertex } from "./Vertex";
import length from "@turf/length";
import { lineString } from "@turf/turf";

/**
 * An edge with its source and target
 */
export class Edge {
    id: string;
    source: Vertex;
    target: Vertex;

    getLength(): number {
        return length(lineString(this.getGeometry().coordinates));
    }

    getGeometry(): LineString {
        return {
            type: "LineString",
            coordinates: [
                this.source.coordinate,
                this.target.coordinate
            ]
        }
    }

}
