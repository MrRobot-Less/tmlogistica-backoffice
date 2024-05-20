"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
console.log('creating the user-admin');
const data = {
    email: 'admin@tmlogistica.com.br',
    name: 'Admin',
    password: 'tmadmin',
};
user_1.default.create(data)
    .then(() => {
    console.log('The admin user has been created.');
})
    .catch(e => {
    console.error(e.message);
});
