require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const users = require('./routes/users')
const auth = require('./routes/auth')
const certificate = require('./routes/certificate')
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true}));
console.log('port:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI);
mongoose
.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})

.then(() => {
  console.log("Database connection successful");
})
.catch((err) => {
  console.log(err);
  console.error("Database connection error");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/api/user' , users)
app.use('/api/auth', auth)
app.use('/api/certificates',certificate)
app.listen(process.env.PORT || 3000, function () {
    console.log(`server Started on localhost port ${process.env.PORT || 3000} `);
  });
