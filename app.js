const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const ticketsRoute = require('./routes/tickets');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
//Middleware
app.use('/tickets', ticketsRoute);


app.get('/', (req, res) => {
	res.send("Response sent");
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true },
	() => {
	console.log('connected to DB');
});

app.listen(3002);
