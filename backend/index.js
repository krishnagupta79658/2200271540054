const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const urlRoutes = require('./routes/urlRoutes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/shorturls', urlRoutes); // All routes under /shorturls/

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error('MongoDB Error: ', err));
