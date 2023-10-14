const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: mongoose.Types.ObjectId,
  quantity: Number,
});

module.exports = mongoose.model('Order', orderSchema);
