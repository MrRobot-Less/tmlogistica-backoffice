"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthRouter = __importStar(require("./auth"));
const DashboardRouter = __importStar(require("./dashboard"));
const CalcRouter = __importStar(require("./calc"));
const APIRouter = __importStar(require("./api"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const cookie_1 = __importDefault(require("../middlewares/cookie"));
const constants_1 = require("../constants");
const router = (0, express_1.Router)();
// theses routers bellow do not need authentication
// ... Homepage, for example
router.use(constants_1.PATH.api, APIRouter.default);
// all routers below need authentication
router.use(cookie_1.default);
router.use(auth_1.default);
router.use(constants_1.PATH.login, AuthRouter.default);
router.use(constants_1.PATH.dashboard, DashboardRouter.default);
router.use(constants_1.PATH.dashboard, CalcRouter.default);
exports.default = router;
