const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv/config');
const ticketsRoute = require('./routes/tickets');
const homeRoute = require('./routes/home');
const usersRoute = require('./routes/users');
const cors = require('cors');
const path = require('path');
const exphbrs = require('express-handlebars');
const session = require('express-session');

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
    store: '',
    cookie: {
        path: "/",
        maxAge: 1000 * 60 * 100, //10 minutes
        sameSite: 'strict',
        secure: false //no https :(
    }
}));

//Middleware
app.use('/tickets', ticketsRoute);
app.use('/', homeRoute);
app.use('/users', usersRoute);
app.use((req,res)=>{ //page not found
  res.render('404', {
      layout: 'users'
  });
})

//test DB

const db = require('./config/database')
db.authenticate()
.then(()=>{
  console.log('DB connected')
})
.catch((err)=>{
  console.log('Error: ' + err)
})

app.listen(3002);
