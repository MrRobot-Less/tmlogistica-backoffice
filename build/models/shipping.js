"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
;
;
const ShippingSchema = new database_1.default.Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    deliveryTime: {
        type: Number,
        required: true
    },
    percentageInsurance: {
        type: Number,
        required: true
    },
    arrivesInSaturday: {
        type: Boolean,
        required: true
    },
    methodPrices: {
        type: [database_1.default.Schema.Types.ObjectId],
        default: []
    }
}, {
    collection: 'Shipping',
    versionKey: false
});
const Shipping = database_1.default.model('Shipping', ShippingSchema);
exports.default = Shipping;
