"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../dtos/error");
function errorHandle(err, req, res, next) {
    var error;
    if (err) {
        if (err instanceof Error)
            error = new error_1.AppError(err.message, 500);
        else
            error = err;
        return res.status(error.status).json({ error: err.message });
    }
    next();
}
exports.default = errorHandle;
