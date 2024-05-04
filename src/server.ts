import express from 'express';
import bodyParser from 'body-parser';
import nunjucks from 'nunjucks';

import errorHandle from './middlewares/error';
import router from './routers';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Configurando a pasta public.
app.use(express.static("public"));

// decoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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