"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coverage_1 = __importDefault(require("../models/coverage"));
var mockCoverage = require('./data/coverage.json');
var chain = Promise.resolve();
mockCoverage.map(mock => {
    chain = chain.then(() => new Promise(resolve => {
        console.log('+1');
        coverage_1.default.create(mock).then(() => resolve());
    }));
});
chain.then(() => {
    console.log('Migrate Coverage Model with initials values');
});
