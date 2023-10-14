const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Define routes for orders
// Handle GET request to retrieve a list of orders
router.get('/', async (req, res) => {
  try {
    const orders = await orderController.getAllOrders();
    // Send the list of orders as a JSON response
    res.json(orders);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: err.message });
  }
});
router.post('/', async (req, res) => {
  try {
    // Assuming orderController.placeOrder is an asynchronous function to create a new order
    const newOrder = await orderController.placeOrder(req.body);

    // Send the newly created order as a JSON response
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating a new order:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/:orderId', async (req, res) => {
  try {
    const updatedOrder = await orderController.updateOrder(
      req.params.orderId,
      req.body
    );

    // Send the updated order as a JSON response
    res.json(updatedOrder);
  } catch (err) {
    // Handle any errors, e.g., sending an error response
    res.status(500).json({ error: err.message });
  }
});

// Cancel an order by ID using DELETE
router.delete('/:orderId', async (req, res) => {
  try {
    // Assuming orderController.cancelOrder is an asynchronous function to cancel an order
    await orderController.cancelOrder(req.params.orderId);

    // Send a success message
    res.json({ message: 'Order canceled successfully' });
  } catch (err) {
    // Handle any errors, e.g., sending an error response
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
