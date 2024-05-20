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
exports.AuthService = void 0;
const error_1 = require("../../dtos/error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../models/user"));
const constants_1 = require("../../constants");
const bcrypt = require('bcryptjs');
const secret = process.env.SECRET;
function generateToken(params) {
    const token = jsonwebtoken_1.default.sign(params, secret, {
        expiresIn: constants_1.TIME_TO_EXPIRES // two weeks
    });
    return token;
}
function generateSessionObject(user) {
    const id = user._id.toString();
    return {
        _id: id,
        email: user.email,
        name: user.name,
        token: generateToken({ id: id })
    };
}
exports.AuthService = {
    register: function (newUser, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield user_1.default.findOne({ email: newUser.email }))
                    return cb(new error_1.AppError('User already registered.'));
                const user = yield user_1.default.create(newUser);
                cb(null, generateSessionObject(user.toObject()));
            }
            catch (err) {
                cb(err);
            }
        });
    },
    authenticate: function (_a, cb_1) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }, cb) {
            try {
                const user = yield user_1.default.findOne({ email: email }).select('+password');
                if (!user)
                    return cb(new error_1.AppError('User not found.'));
                if (!(yield bcrypt.compare(password, user.password)))
                    return cb(new error_1.AppError('The email or password incorrect.'));
                cb(null, generateSessionObject(user.toObject()));
            }
            catch (err) {
                cb(err);
            }
        });
    },
    validate: function (token, cb) {
        jsonwebtoken_1.default.verify(token, secret, cb);
    }
};
