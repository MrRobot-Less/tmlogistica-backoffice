"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;
mongoose_1.default.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`);
mongoose_1.default.Promise = global.Promise;
exports.default = mongoose_1.default;
