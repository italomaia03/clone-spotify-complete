import { CustomApiError } from "./CustomApiError";

export class BadRequestError extends CustomApiError {
    statusCode: number;

    constructor(message: string) {
        super(message || "Bad Request");
        this.statusCode = 400;
    }
}
