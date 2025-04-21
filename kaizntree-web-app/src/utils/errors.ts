export class APICallError extends Error {
    constructor(
        public status: number,
        message: string,
    ) {
        super(message)
    }
}