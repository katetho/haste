const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const ticketsRoute = require('./routes/tickets');
const ticketCards = require('./routes/ticketCards');
const usersRoute = require('./routes/users');
const cors = require('cors');
const path = require('path');
const exphbrs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbrs({
    defaultLayout: 'main'
}));
app.use(bodyParser.json());
app.use(cors());

//Authentication
app.use(session({
    name: process.env.SESSION_NAME,
    saveUninitialized: true, //false for implementing login sessions
    resave: true, //true saves the ssesion back to DB even if unmodified
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: mongoose.connection //use an existing mongoose con
    }),
    cookie: {
        path: "/",
        maxAge: 1000 * 60 * 100, //10 minutes
        sameSite: 'strict',
        secure: false //no https :(
    }
}));

//Middleware
app.use('/tickets', ticketsRoute);
app.use('/', ticketCards);
app.use('/users', usersRoute);

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => {
        console.log('connected to DB');
    });


app.listen(3002);
