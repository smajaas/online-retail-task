const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get a list of all products using GET
router.get('/', async (req, res) => {
  try {
    const products = await productController.getAllProducts(req, res);
    res.json(products);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a new product using POST
router.post('/', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const newProduct = await productController.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating a new product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a single product by ID using GET
router.get('/:productId', async (req, res) => {
  try {
    const product = await productController.getProductById(
      req.params.productId
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a product by ID using PUT
router.put('/:productId', async (req, res) => {
  try {
    // Assuming productController.updateProduct is an asynchronous function to update a product
    const updatedProduct = await productController.updateProduct(
      req.params.productId,
      req.body
    );

    // Send the updated product as a JSON response
    res.json(updatedProduct);
  } catch (err) {
    // Handle any errors, e.g., sending an error response
    res.status(500).json({ error: err.message });
  }
});
// Delete a product by ID using DELETE
router.delete('/:productId', async (req, res) => {
  try {
    // Assuming productController.deleteProduct is an asynchronous function to delete a product
    await productController.deleteProduct(req.params.productId);

    // Send a success message
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    // Handle any errors, e.g., sending an error response
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
