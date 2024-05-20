"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_1 = require("./service");
const auth_required_1 = __importDefault(require("../../middlewares/auth-required"));
const router = (0, express_1.Router)();
router.use(auth_required_1.default);
router.get('/calc', (req, res) => {
    res.render("dashboard/calc/index");
});
// Coverage Model
router.get('/calc/coverage', (req, res) => {
    service_1.CalcService.coverage.getAll((error, coverages) => {
        service_1.CalcService.coverage.format(coverages, (_err, object) => {
            res.render("dashboard/calc/coverage/index", { coverages: object });
        });
    });
});
router.get('/calc/coverage/add', (req, res) => {
    res.render("dashboard/calc/coverage/[id]");
});
router.post('/calc/coverage/add', (req, res) => {
    service_1.CalcService.coverage.create(req.body, (error, coverage) => {
        if (error || !coverage) {
            req.flash('error_msg', (error === null || error === void 0 ? void 0 : error.message) || 'Não foi possível salvar essa cobertura.');
            return res.redirect('/dashboard/calc/coverage');
        }
        req.flash('success_msg', 'Cobertura salva com sucesso!');
        res.redirect('/dashboard/calc/coverage/' + (coverage === null || coverage === void 0 ? void 0 : coverage._id.toString()));
    });
});
router.get('/calc/coverage/:id', (req, res) => {
    service_1.CalcService.coverage.getById(req.params.id, (_, coverage) => {
        if (!coverage)
            return res.redirect(req.originalUrl);
        service_1.CalcService.coverage.format(coverage, (_err, object) => {
            res.render("dashboard/calc/coverage/[id]", { coverage: object });
        });
    });
});
router.post('/calc/coverage/:id', (req, res) => {
    service_1.CalcService.coverage.update(req.params.id, req.body, (error, coverage) => {
        if (error || !coverage) {
            req.flash('error_msg', (error === null || error === void 0 ? void 0 : error.message) || 'Não foi possível salvar essa cobertura.');
            return res.redirect('/dashboard/calc/coverage');
        }
        req.flash('success_msg', 'Cobertura salva com sucesso!');
        res.redirect('/dashboard/calc/coverage/' + (coverage === null || coverage === void 0 ? void 0 : coverage._id.toString()));
    });
});
router.get('/calc/coverage/:id/delete', (req, res) => {
    service_1.CalcService.coverage.deleteById(req.params.id, (error) => {
        if (error) {
            req.flash('error_msg', error.message);
        }
        else {
            req.flash('success_msg', 'Cobertura removida com sucesso!');
        }
        res.redirect('/dashboard/calc/coverage');
    });
});
// Shipping Model
router.get('/calc/shipping', (req, res) => {
    service_1.CalcService.shipping.getAll((error, shippings) => {
        res.render("dashboard/calc/shipping/index", { shippings });
    });
});
router.get('/calc/shipping/add', (req, res) => {
    service_1.CalcService.methodPrice.getAll((_, prices) => {
        res.render("dashboard/calc/shipping/[id]", { prices });
    });
});
router.post('/calc/shipping/add', (req, res) => {
    service_1.CalcService.shipping.create(req.body, (error, shipping) => {
        if (error || !shipping) {
            req.flash('error_msg', (error === null || error === void 0 ? void 0 : error.message) || 'Não foi possível salvar essa cobertura.');
            return res.redirect('/dashboard/calc/shipping');
        }
        req.flash('success_msg', 'Cobertura salva com sucesso!');
        res.redirect('/dashboard/calc/shipping/' + (shipping === null || shipping === void 0 ? void 0 : shipping._id.toString()));
    });
});
router.get('/calc/shipping/:id', (req, res) => {
    service_1.CalcService.shipping.getById(req.params.id, (_, shipping) => {
        if (!shipping)
            return res.redirect(req.originalUrl);
        service_1.CalcService.methodPrice.getAll((_, prices) => {
            var _a;
            var priceSelected = ((_a = shipping.methodPrices) === null || _a === void 0 ? void 0 : _a.reduce((prev, curr, index, array) => (Object.assign(Object.assign({}, prev), { [array[index].toString()]: ++index })), {})) || {};
            res.render("dashboard/calc/shipping/[id]", { shipping, prices, priceSelected });
        });
    });
});
router.post('/calc/shipping/:id', (req, res) => {
    service_1.CalcService.shipping.update(req.params.id, req.body, (error, shipping) => {
        if (error || !shipping) {
            req.flash('error_msg', (error === null || error === void 0 ? void 0 : error.message) || 'Não foi possível salvar esse envio.');
            return res.redirect('/dashboard/calc/shipping');
        }
        req.flash('success_msg', 'Envio salvo com sucesso!');
        res.redirect('/dashboard/calc/shipping/' + (shipping === null || shipping === void 0 ? void 0 : shipping._id.toString()));
    });
});
router.get('/calc/shipping/:id/delete', (req, res) => {
    service_1.CalcService.shipping.deleteById(req.params.id, (error) => {
        if (error) {
            req.flash('error_msg', error.message);
        }
        else {
            req.flash('success_msg', 'Envio removida com sucesso!');
        }
        res.redirect('/dashboard/calc/shipping');
    });
});
// Method Price Model
router.get('/calc/method-price', (req, res) => {
    service_1.CalcService.methodPrice.getAll((error, methodPrices) => {
        res.render("dashboard/calc/method-price/index", { methodPrices });
    });
});
router.get('/calc/method-price/add', (req, res) => {
    res.render("dashboard/calc/method-price/[id]");
});
router.post('/calc/method-price/add', (req, res) => {
    service_1.CalcService.methodPrice.create(req.body, (error, methodPrice) => {
        if (error || !methodPrice) {
            req.flash('error_msg', (error === null || error === void 0 ? void 0 : error.message) || 'Não foi possível salvar esse preço.');
            return res.redirect('/dashboard/calc/method-price');
        }
        req.flash('success_msg', 'Preço salvo com sucesso!');
        res.redirect('/dashboard/calc/method-price/' + (methodPrice === null || methodPrice === void 0 ? void 0 : methodPrice._id.toString()));
    });
});
router.get('/calc/method-price/:id', (req, res) => {
    service_1.CalcService.methodPrice.getById(req.params.id, (_, methodPrice) => {
        if (!methodPrice)
            return res.redirect(req.originalUrl);
        res.render("dashboard/calc/method-price/[id]", { methodPrice });
    });
});
router.post('/calc/method-price/:id', (req, res) => {
    service_1.CalcService.methodPrice.update(req.params.id, req.body, (error, methodPrice) => {
        if (error || !methodPrice) {
            req.flash('error_msg', (error === null || error === void 0 ? void 0 : error.message) || 'Não foi possível salvar esse preço.');
            return res.redirect('/dashboard/calc/method-price');
        }
        req.flash('success_msg', 'Preço salvo com sucesso!');
        res.redirect('/dashboard/calc/method-price/' + (methodPrice === null || methodPrice === void 0 ? void 0 : methodPrice._id.toString()));
    });
});
router.get('/calc/method-price/:id/delete', (req, res) => {
    service_1.CalcService.methodPrice.deleteById(req.params.id, (error) => {
        if (error) {
            req.flash('error_msg', error.message);
        }
        else {
            req.flash('success_msg', 'Envio removida com sucesso!');
        }
        res.redirect('/dashboard/calc/method-price');
    });
});
exports.default = router;
