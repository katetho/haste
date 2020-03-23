const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors');
const path = require('path');
const exphbrs = require('express-handlebars');
const session = require('express-session');
const Sequelize = require('sequelize');
const Session = require('./models/Session');
const router = require('./routes/routes');

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbrs({
    defaultLayout: 'main'
}));
app.use(bodyParser.json());
app.use(cors());

//test DB
const db = require('./config/database')
db.authenticate()
    .then(() => {
        console.log('DB connected')
    })
    .catch((err) => {
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
    db: db,
    table: 'session',
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 10 * 1000, // The maximum age (in milliseconds) of a valid session.
    extendDefaultFields: extendDefaultFields
});

app.use(session({
    name: process.env.SESSION_NAME,
    saveUninitialized: true, //false for implementing login sessions
    resave: true, //true saves the ssesion back to DB even if unmodified
    secret: process.env.SESSION_SECRET,
    store: seshStore,
    cookie: {
        path: "/",
        maxAge: 1000 * 60 * 100, //10 minutes
        sameSite: 'strict',
        secure: false //no https :(
    }
}));
seshStore.sync();

//Middleware
app.use('/', router)

app.listen(3002);
