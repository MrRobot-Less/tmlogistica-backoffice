"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("../routers/auth/service");
const constants_1 = require("../constants");
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const errorHandleAuth = () => {
        if (req.originalUrl === constants_1.PATH.login)
            return next();
        res.redirect(constants_1.PATH.login);
    };
    if (!authHeader)
        return errorHandleAuth();
    const parts = authHeader.split(' ');
    if (!(parts.length === 2))
        return errorHandleAuth();
    const [schema, token] = parts;
    if (!/^Bearer$/i.test(schema))
        return errorHandleAuth();
    const callback = (err, decoded) => {
        if (err)
            return errorHandleAuth();
        req.user = decoded;
        res.locals.user = req.user;
        return next();
    };
    service_1.AuthService.validate(token, callback);
}
exports.default = authMiddleware;
