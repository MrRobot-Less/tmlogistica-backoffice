import express from 'express';
import bodyParser from 'body-parser';
import nunjucks from 'nunjucks';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import session from 'express-session';

import errorHandle from './middlewares/error';
import router from './routers';

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

// Configurando a pasta public.
app.use(express.static("public"));

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
nunjucks.configure("./src/views", {
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