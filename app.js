const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const ticketsRoute = require('./routes/tickets');
const cors = require('cors');
const path = require('path');
const exphbrs = require('express-handlebars');

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/public/views'));
app.engine('handlebars', exphbrs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(cors());
//Middleware
app.use('/tickets', ticketsRoute);


app.get('/', (req, res) => {
	res.render('home');
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true },
	() => {
	console.log('connected to DB');
});

app.listen(3002);
