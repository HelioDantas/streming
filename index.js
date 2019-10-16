const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const {config} = require('dotenv');
const {ok, deepEqual} = require('assert');
const {join} = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();

const env = process.env.NODE_ENV || "dev"
ok(env === "prod" || env === "dev", "a env é invalida");

const configPath = join(__dirname, './src/config', `.env.${env}`);
config({
    path: configPath
});

const indexRouter = require('./src/routes/routes');
const middleware = require('./src/middleware/api');


const app = express();
app.use((err, req, res, next) => {
    console.log(req.app.get('env'));
    err.message = req.app.get('env') === 'dev' ? err.message : {};
    res.status(500).send(err.message);
});

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', middleware);
indexRouter(app);

app.use((err, req, res, next) => {
    console.log(req.app.get('env'));
    err.message = req.app.get('env') === 'dev' ? err.message : {};
    res.status(500).send(err.message);
});

module.exports = app;
