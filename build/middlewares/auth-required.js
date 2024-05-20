"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authRequiredMiddleware(req, res, next) {
    if (req.user) {
        return next();
    }
    res.redirect(req.originalUrl);
}
exports.default = authRequiredMiddleware;
