"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const method_price_1 = __importDefault(require("../models/method-price"));
var mockMethodPrice = require('./data/method-price.json');
var chain = Promise.resolve();
mockMethodPrice.map(mock => {
    chain = chain.then(() => new Promise(resolve => {
        console.log('+1');
        method_price_1.default.create(mock).then(() => resolve());
    }));
});
chain.then(() => {
    console.log('Migrate MethodPrice Model with initials values');
});
