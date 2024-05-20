"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError {
    constructor(message, statusCode) {
        this.message = message;
        this.status = statusCode || 400;
    }
}
exports.AppError = AppError;
