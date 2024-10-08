import express from 'express';
import bodyParser from 'body-parser';
import nunjucks from 'nunjucks';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import session from 'express-session';
import cors from 'cors';

import errorHandle from './middlewares/error';
import router from './routers';

const PORT = process.env.SERVER_PORT || 3500;
const app = express();
app.use(cors({
    origin: '*'
}));

// Configurando a pasta public.
app.use(express.static("./public"));

// decoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    cookie: { maxAge: 6000000 },
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false
}));
app.use(flash());

// Config da template engine.
app.set("view engine", "njk");
nunjucks.configure("views", {
    express:app,
    autoescape:false,
    noCache:true,
});

// routers
app.use('/', router);
app.use(errorHandle);

app.listen(PORT, () => { 
	console.log(`[+] server running on port ${PORT}`);
});

module.exports = app;