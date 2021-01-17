const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();

app.use(cors())
app.use(bodyParser.json())

// Import Routes
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');

app.use('/posts', postsRoute);
app.use('/user', userRoute);

//Routes
app.get('/', (req, res) => {
	res.send('We are on HomePage')
});

// Connect MongoDB
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true  }, () => {
	console.log("Connected to DB")
});

app.listen(3000, () => {
	console.log("Running RESTful API on port http://localhost:3000");
});