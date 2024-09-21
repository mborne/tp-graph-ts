/**
 * Error thrown when a vertex is not found
 */
export class RouteNotFound extends Error {
    constructor(message: string){
        super(message);
    }
}
