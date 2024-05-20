"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../../constants");
const auth_required_1 = __importDefault(require("../../middlewares/auth-required"));
const router = (0, express_1.Router)();
router.use(auth_required_1.default);
router.get('/', (req, res) => {
    return res.redirect(constants_1.PATH.calc);
    // res.render("dashboard/index");
});
router.get('/requests', (req, res) => {
    return res.redirect(constants_1.PATH.calc);
    // res.render("dashboard/requests");
});
router.get('/users', (req, res) => {
    return res.redirect(constants_1.PATH.calc);
    // res.render("dashboard/users");
});
exports.default = router;
