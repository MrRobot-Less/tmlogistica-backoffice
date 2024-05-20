"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_1 = require("./service");
const router = (0, express_1.Router)();
router.post('/calculate', (req, res) => {
    req.body.weight = req.body.weight || '0';
    service_1.APIService.calculate.TMShipping.calc(req.body, (error, shippings) => {
        res.json({ status: (error === null || error === void 0 ? void 0 : error.status) || 200, shippings: shippings });
    });
});
exports.default = router;
