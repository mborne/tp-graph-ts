/**
 * Error thrown when a vertex is not found
 */
export class VertexNotFound extends Error {
    constructor(message: string){
        super(message);
    }
}
