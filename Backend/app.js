const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Certificate = require('./model/certificate');


const app = express();

mongoose
  .connect("mongodb+srv://tahalajili:TAzGLiD5TNfbzwg7@cluster0.5kumbar.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to DB successfully!');
  })
  .catch((error) => {
    console.log('Connection to DB failed', error.message);
  });

app.use(cors());
app.use(bodyParser.json());



app.post('/api/certificates', (req, res, next) => {
  const certificateBody = req.body;
  const certificate = new Certificate(certificateBody);

  certificate.save()
    .then(() => {
      console.log(certificate);
      res.status(201).json({ message: 'Certificate added successfully!' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Failed to add Certificate.' });
    });
});

app.get('/api/certificates', (req, res, next) => {
  Certificate.find()
    .then((certificates) => {
      console.log(certificates);
      res.status(200).json({
        message: 'Certificates fetched successfully',
        certificates: certificates
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch Certificates.' });
    });
});
module.exports = app;
