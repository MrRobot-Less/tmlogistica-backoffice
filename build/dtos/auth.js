"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = {
    email: zod_1.z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    name: zod_1.z.string().regex(/^[a-zA-Z\s]{3,}$/),
    password: zod_1.z.string().min(6, 'Name should have at least 6 characters'),
};
const registerUserObject = zod_1.z.object(exports.registerUserSchema);
exports.authenticateUserSchema = {
    email: zod_1.z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: zod_1.z.string().min(6, 'Name should have at least 6 characters'),
};
const authenticateUserObject = zod_1.z.object(exports.authenticateUserSchema);
