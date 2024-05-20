"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_1 = require("./service");
const constants_1 = require("../../constants");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    if (req.user) {
        return res.redirect(constants_1.PATH.dashboard);
    }
    res.render("login", { error: req.flash('error_msg') });
});
router.post('/', (req, res) => {
    service_1.AuthService.authenticate({ email: req.body.email, password: req.body.password }, (err, userObject) => {
        if (err || !userObject) {
            req.flash('error_msg', 'Usuário ou senha incorreto.');
            return res.redirect(req.originalUrl);
        }
        ;
        req.session.user = userObject;
        req.session.save(() => {
            res.redirect(req.originalUrl);
        });
    });
});
router.get('/logout', (req, res) => {
    if (!req.user) {
        return res.redirect(constants_1.PATH.login);
    }
    req.session.destroy(() => {
        res.redirect(constants_1.PATH.login);
    });
});
exports.default = router;
