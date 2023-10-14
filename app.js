const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./database/config/connect');

// Middleware
app.use(express.json());
app.use(express.urlencoded());

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Use the routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use(express.urlencoded({ extended: true }));

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
