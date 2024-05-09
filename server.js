const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const expressValidator = require('express-validator');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
require('dotenv').config();

// app
const app = express();

// db connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://yc2457:7VOkAynCUuCeQY9Z@cluster-0.rhnzkmj.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};
connectDB();

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

// Have Node serve the files for our built React app
app.use(express.static(path.join(__dirname, 'client/build')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
