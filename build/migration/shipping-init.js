"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shipping_1 = __importDefault(require("../models/shipping"));
var mockShipping = require('./data/shipping.json');
var chain = Promise.resolve();
mockShipping.map(mock => {
    chain = chain.then(() => new Promise(resolve => {
        console.log('+1');
        shipping_1.default.create(mock).then(() => resolve());
    }));
});
chain.then(() => {
    console.log('Migrate Shipping Model with initials values');
});
