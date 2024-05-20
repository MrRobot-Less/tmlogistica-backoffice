"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cookieMiddleware(req, res, next) {
    var _a;
    const tokenCookie = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.token;
    if (!tokenCookie)
        return next();
    req.headers.authorization = 'Bearer ' + tokenCookie;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
}
exports.default = cookieMiddleware;
