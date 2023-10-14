const express = require('express');
const Order = require('../database/models/Order');
const Product = require('../database/models/Product');

const router = express.Router();

// Get a list of all orders
async function getAllOrders(req, res) {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Place a new order
router.post('/', async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.quantity < quantity) {
      return res
        .status(400)
        .json({ error: 'Product is not available in the requested quantity' });
    }

    // Deduct the ordered quantity from the product's quantity
    product.quantity -= quantity;
    await product.save();

    // Create a new order
    const order = new Order({
      productId,
      quantity,
    });

    const savedOrder = await order.save();
    res.json(savedOrder);
  } catch (error) {
    console.error('Error creating a new order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Cancel an order by ID
router.delete('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const product = await Product.findById(order.productId);

    if (!product) {
      return res.status(404).json({ error: 'Related product not found' });
    }

    // Add the canceled quantity back to the product's quantity
    product.quantity += order.quantity;
    await product.save();

    // Delete the order
    await Order.findByIdAndRemove(req.params.orderId);

    res.json({ message: 'Order canceled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
