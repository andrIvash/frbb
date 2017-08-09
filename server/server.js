import express from 'express';
import http from 'http';
import path from 'path';
import errorHandler from 'errorhandler';
import config from './config/';
import routes from './routes';
import { HttpError } from './error/';
import sendHttpError from './middleware/sendHttpError';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/templates'));
app.set('view engine', 'pug');

// подключение middleware
app.use(sendHttpError);

// подключение routes
routes(app);

// --------------------  обработка ошибки  ------------------//

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new HttpError(400, 'wrong query');
    next(err);
});

// error handlers
app.use((err, req, res, next) => {
    if (typeof err === 'number') {
        err = new HttpError(err);
    }
    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else if (app.get('env') === 'development') {
            const errorhandler = errorHandler();
            errorhandler(err, req, res, next);
        } else {
            console.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
);


// -------------------------запуск сервера ----------------------------//

http.createServer(app).listen(config().get('port'), function() {
    console.log('express server listening on port : ' + config().get('port'));
});

