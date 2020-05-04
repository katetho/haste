import express from "express";
const app = express();
require('dotenv/config');
import path from 'path';
import exphbrs from 'express-handlebars';
import session from 'express-session';
import bodyParser from 'body-parser';
import { router } from './routes/routes';
import cors from 'cors';
import { db } from './config/database';

app.use(express.static(path.join(__dirname, '/../client')));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbrs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/../../views/layouts')
}));
app.use(bodyParser.json());
app.use(cors({
    origin: function(origin, callback){
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
  }));
//test DB
db.authenticate()
    .then(() => {
        console.log('DB connected')
    })
    .catch((err: string) => {
        console.log('Error: ' + err)
    })
//Authentication
let SequelizeStore = require('connect-session-sequelize')(session.Store); // initalize sequelize with session store

function extendDefaultFields(defaults, session) {
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: session.userId
  };
}

let seshStore = new SequelizeStore({
    db,
    table: 'Session',
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 10 * 1000, // The maximum age (in milliseconds) of a valid session.
    extendDefaultFields
});

app.use(session({
    name: "sid",
    saveUninitialized: true, //false for implementing login sessions
    resave: true, //true saves the ssesion back to DB even if unmodified
    secret: "make_up_a_better_secret",
    store: seshStore,
    cookie: {
        path: "/",
        maxAge: 1000 * 60 * 100, //100 minutes
        sameSite: 'strict',
        secure: false //no https :(
    }
}));

seshStore.sync();

//Middleware
app.use('/', router)
db.sync()
    .then(() => {
        app.listen(process.env.PORT)
    })
    .catch(err => console.log(err));
