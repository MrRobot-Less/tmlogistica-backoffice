"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const MethodPriceSchema = new database_1.default.Schema({
    initialWeight: {
        type: Number,
        required: true
    },
    finalWeight: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
}, {
    collection: 'MethodPrice',
    versionKey: false
});
const MethodPrice = database_1.default.model('MethodPrice', MethodPriceSchema);
exports.default = MethodPrice;
