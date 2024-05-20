"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIService = void 0;
const api_1 = require("../../dtos/api");
const error_1 = require("../../dtos/error");
const helpers_1 = __importDefault(require("../../helpers"));
const coverage_1 = __importDefault(require("../../models/coverage"));
const method_price_1 = __importDefault(require("../../models/method-price"));
const shipping_1 = __importDefault(require("../../models/shipping"));
exports.APIService = {
    calculate: {
        TMShipping: {
            getCoverage: (postalCode) => new Promise(resolve => {
                const zipcode = helpers_1.default.reversePostalCode(postalCode);
                coverage_1.default.findOne({
                    digit: zipcode.digit,
                    initialPostalCode: { $lte: zipcode.code },
                    finalPostalCode: { $gte: zipcode.code }
                })
                    .then(coverage => resolve((coverage === null || coverage === void 0 ? void 0 : coverage.toJSON()) || null))
                    .catch(error => resolve(null));
            }),
            getAllPriceWeightId: (w) => new Promise(resolve => {
                const weight = parseFloat(w);
                method_price_1.default.find({
                    initialWeight: { $lte: weight },
                    finalWeight: { $gte: weight }
                })
                    .then(prices => resolve(prices.map(price => price.toJSON()._id)))
                    .catch(() => resolve([]));
            }),
            getPriceWeight: (pricesId, w) => new Promise(resolve => {
                const weight = parseFloat(w);
                method_price_1.default.findOne({
                    _id: { $in: pricesId },
                    initialWeight: { $lte: weight },
                    finalWeight: { $gte: weight }
                })
                    .then(price => resolve((price === null || price === void 0 ? void 0 : price.toJSON()) || null))
                    .catch(error => resolve(null));
            }),
            getShipping: (pricesId, type) => new Promise(resolve => {
                shipping_1.default.find({
                    methodPrices: { $in: pricesId },
                    type: type
                }).sort({ _id: -1 })
                    .then(shippings => resolve(shippings.map(shipping => shipping.toJSON())))
                    .catch(() => resolve([]));
            }),
            getValue: (productValue, pricesId, weight, percentageInsurance) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const price = yield exports.APIService.calculate.TMShipping.getPriceWeight(pricesId, weight);
                if (!price) {
                    throw new Error('price weight not found');
                }
                return price.value + (parseFloat((_a = productValue.replace('.', '')) !== null && _a !== void 0 ? _a : 0) / 100) * percentageInsurance;
            }),
            formatDeadlineDelivery: (deliveryTime) => {
                if (deliveryTime === 0) {
                    return 'Entrega no mesmo dia';
                }
                else if (deliveryTime > 1) {
                    var intPart = parseInt(deliveryTime.toString());
                    var rest = deliveryTime - intPart;
                    return `${intPart} ${rest ? helpers_1.default.decimalToFraction(rest) : ''} ${intPart > 1 ? 'Dias úteis' : 'Dia útil'}`;
                }
                return `${helpers_1.default.decimalToFraction(deliveryTime)} Dia útil`;
            },
            calc: (data, cb) => {
                if (!data['cep-origin'] || !data['cep-target']) {
                    return cb(new error_1.AppError('empty zipcode.'), api_1.fallbackShippingResponse);
                }
                Promise.all([
                    exports.APIService.calculate.TMShipping.getCoverage(data["cep-origin"]),
                    exports.APIService.calculate.TMShipping.getCoverage(data["cep-target"])
                ]).then((coverages) => __awaiter(void 0, void 0, void 0, function* () {
                    var areThereCoverage = coverages.every(coverage => !!coverage);
                    if (!areThereCoverage) {
                        return cb(new error_1.AppError('No coverage for this postal code.'), api_1.fallbackShippingResponse);
                    }
                    coverages.sort((a, b) => b.finalPostalCode - a.finalPostalCode);
                    const type = coverages[0].type;
                    const pricesId = yield exports.APIService.calculate.TMShipping.getAllPriceWeightId(data.weight);
                    exports.APIService.calculate.TMShipping.getShipping(pricesId, type)
                        .then((shippings) => __awaiter(void 0, void 0, void 0, function* () {
                        if (!(shippings === null || shippings === void 0 ? void 0 : shippings.length)) {
                            return cb(null, api_1.fallbackShippingResponse);
                        }
                        Promise.all(shippings.map((shipping) => __awaiter(void 0, void 0, void 0, function* () {
                            return ({
                                name: shipping.name,
                                deadlineDelivery: exports.APIService.calculate.TMShipping.formatDeadlineDelivery(shipping.deliveryTime),
                                deliverySaturday: shipping.arrivesInSaturday,
                                homeDelivery: true,
                                shippingCompany: 'TM',
                                value: (yield exports.APIService
                                    .calculate
                                    .TMShipping
                                    .getValue(data["do-not-want-insurance"] === 'on' ? '0' : data.value, shipping.methodPrices, data.weight, shipping.percentageInsurance)),
                            });
                        }))).then(response => {
                            cb(null, response);
                        }).catch(error => cb(error, api_1.fallbackShippingResponse));
                    }))
                        .catch(error => cb(error, api_1.fallbackShippingResponse));
                })).catch(error => cb(error, api_1.fallbackShippingResponse));
            }
        }
    }
};
