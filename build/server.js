"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const error_1 = __importDefault(require("./middlewares/error"));
const routers_1 = __importDefault(require("./routers"));
const PORT = process.env.SERVER_PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*'
}));
// Configurando a pasta public.
app.use(express_1.default.static("./public"));
// decoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    cookie: { maxAge: 6000000 },
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false
}));
app.use((0, connect_flash_1.default)());
// Config da template engine.
app.set("view engine", "njk");
nunjucks_1.default.configure("./src/views", {
    express: app,
    autoescape: false,
    noCache: true,
});
// routers
app.use('/', routers_1.default);
app.use(error_1.default);
app.listen(PORT, () => {
    console.log(`[+] server running on port ${PORT}`);
});
