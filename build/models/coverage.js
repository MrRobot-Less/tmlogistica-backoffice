"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const CoverageSchema = new database_1.default.Schema({
    initialPostalCode: {
        type: Number,
        required: true,
    },
    finalPostalCode: {
        type: Number,
        required: true,
    },
    digit: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {
    collection: 'Coverage',
    versionKey: false
});
const Coverage = database_1.default.model('Coverage', CoverageSchema);
exports.default = Coverage;
