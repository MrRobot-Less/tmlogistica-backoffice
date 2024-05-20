"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcService = void 0;
const error_1 = require("../../dtos/error");
const coverage_1 = __importDefault(require("../../models/coverage"));
const helpers_1 = __importDefault(require("../../helpers"));
const shipping_1 = __importDefault(require("../../models/shipping"));
const method_price_1 = __importDefault(require("../../models/method-price"));
exports.CalcService = {
    coverage: {
        create: function (data, cb) {
            const initialPostalCode = parseInt(data.initialPostalCode.replace('-', ''));
            const finalPostalCode = parseInt(data.finalPostalCode.replace('-', ''));
            const coverage = {
                digit: parseInt(data.initialPostalCode[0]),
                initialPostalCode,
                finalPostalCode,
                type: data.type
            };
            coverage_1.default.create(coverage)
                .then(coverage => {
                cb(null, (coverage === null || coverage === void 0 ? void 0 : coverage.toJSON()) || null);
            }).catch(error => cb(error, null));
        },
        update: function (id, data, cb) {
            const initialPostalCode = parseInt(data.initialPostalCode.replace('-', ''));
            const finalPostalCode = parseInt(data.finalPostalCode.replace('-', ''));
            const coverage = {
                digit: parseInt(data.initialPostalCode[0]),
                initialPostalCode,
                finalPostalCode,
                type: data.type
            };
            coverage_1.default.findOneAndUpdate({ _id: id }, coverage)
                .then(coverage => {
                cb(null, (coverage === null || coverage === void 0 ? void 0 : coverage.toJSON()) || null);
            }).catch(error => cb(error, null));
        },
        getAll: function (cb) {
            coverage_1.default.find({})
                .then(coverages => {
                cb(null, coverages.map(coverage => coverage.toJSON()));
            }).catch(error => cb(error, []));
        },
        getById: function (id, cb) {
            coverage_1.default.findById(id)
                .then(coverage => {
                if (!coverage)
                    return cb(null, null);
                cb(null, coverage.toJSON());
            }).catch(error => cb(error, null));
        },
        deleteById: function (id, cb) {
            coverage_1.default.deleteOne({ _id: id })
                .then(() => {
                cb(null);
            }).catch(cb);
        },
        format: function (coverages, cb) {
            if (Array.isArray(coverages)) {
                var coveragesFormated = coverages.map(coverage => ({
                    _id: coverage._id,
                    initialPostalCode: helpers_1.default.formatPostalCode(coverage.digit, coverage.initialPostalCode),
                    finalPostalCode: helpers_1.default.formatPostalCode(coverage.digit, coverage.finalPostalCode),
                    type: coverage.type
                }));
                return cb(null, coveragesFormated);
            }
            cb(null, {
                _id: coverages._id,
                initialPostalCode: helpers_1.default.formatPostalCode(coverages.digit, coverages.initialPostalCode),
                finalPostalCode: helpers_1.default.formatPostalCode(coverages.digit, coverages.finalPostalCode),
                type: coverages.type
            });
        }
    },
    shipping: {
        getAll: function (cb) {
            shipping_1.default.find({})
                .then(shippings => cb(null, shippings.map(shipping => shipping.toJSON())))
                .catch(error => cb(error, []));
        },
        getById: function (id, cb) {
            shipping_1.default.findById(id)
                .then(shipping => cb(null, (shipping === null || shipping === void 0 ? void 0 : shipping.toJSON()) || null))
                .catch(error => cb(error, null));
        },
        update: function (id, data, cb) {
            const shipping = {
                arrivesInSaturday: data.arrivesInSaturday === 'yes',
                deliveryTime: parseFloat(data.deliveryTime),
                name: data.name,
                percentageInsurance: parseFloat(data.percentageInsurance),
                type: data.type,
                methodPrices: data.methodPrices || []
            };
            shipping_1.default.findOneAndUpdate({ _id: id }, shipping)
                .then(shipping => {
                cb(null, (shipping === null || shipping === void 0 ? void 0 : shipping.toJSON()) || null);
            }).catch(error => cb(error, null));
        },
        create: function (data, cb) {
            const shipping = {
                arrivesInSaturday: data.arrivesInSaturday === 'yes',
                deliveryTime: parseFloat(data.deliveryTime),
                name: data.name,
                percentageInsurance: parseFloat(data.percentageInsurance),
                type: data.type,
                methodPrices: data.methodPrices || []
            };
            shipping_1.default.create(shipping)
                .then(shipping => cb(null, (shipping === null || shipping === void 0 ? void 0 : shipping.toJSON()) || null))
                .catch(error => cb(error, null));
        },
        deleteById: function (id, cb) {
            shipping_1.default.deleteOne({ _id: id })
                .then(() => {
                cb(null);
            }).catch(cb);
        },
    },
    methodPrice: {
        getAll: function (cb) {
            method_price_1.default.find({}).sort({ initialWeight: 1 })
                .then(prices => cb(null, prices.map(prices => prices.toJSON())))
                .catch(error => cb(error, []));
        },
        getById: function (id, cb) {
            method_price_1.default.findById(id)
                .then(price => cb(null, (price === null || price === void 0 ? void 0 : price.toJSON()) || null))
                .catch(error => cb(error, null));
        },
        update: function (id, data, cb) {
            const finalWeight = parseFloat(data.finalWeight);
            const initialWeight = parseFloat(data.initialWeight);
            if (finalWeight < initialWeight) {
                return cb(new error_1.AppError('O peso inicial não pode ser maior que o peso final'), null);
            }
            const price = {
                finalWeight,
                initialWeight,
                value: parseFloat(data.value)
            };
            method_price_1.default.findOneAndUpdate({ _id: id }, price)
                .then(MethodPrice => {
                cb(null, (MethodPrice === null || MethodPrice === void 0 ? void 0 : MethodPrice.toJSON()) || null);
            }).catch(error => cb(error, null));
        },
        create: function (data, cb) {
            const finalWeight = parseFloat(data.finalWeight);
            const initialWeight = parseFloat(data.initialWeight);
            if (finalWeight < initialWeight) {
                return cb(new error_1.AppError('O peso inicial não pode ser maior que o peso final'), null);
            }
            const price = {
                finalWeight,
                initialWeight,
                value: parseFloat(data.value)
            };
            method_price_1.default.create(price)
                .then(MethodPrice => {
                cb(null, (MethodPrice === null || MethodPrice === void 0 ? void 0 : MethodPrice.toJSON()) || null);
            }).catch(error => cb(error, null));
        },
        deleteById: function (id, cb) {
            method_price_1.default.deleteOne({ _id: id })
                .then(() => {
                cb(null);
            }).catch(cb);
        },
    }
};
