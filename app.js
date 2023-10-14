require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const connectDB = require('./database/config/connect');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.get('/', (req, res) => {
  res.send(
    '<h1>Store Online API</h1><a href="/api/products">products route</a>'
  );
});

// Use the routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = app;
