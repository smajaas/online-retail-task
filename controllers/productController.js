const Product = require('../database/models/Product');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

// Create a new product
async function createProduct(req, res) {
  try {
    const { name, price, description } = req.body;
    const product = new Product({ name, price, description });
    const savedProduct = await product.save();
    res.status(StatusCodes.CREATED).json(savedProduct);
  } catch (error) {
    console.error('Error creating a new order:', error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Please provide the name,price and description' });
  }
}

// Get a list of all products
async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(console.log('Error:', error));
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

// Get a single product by ID
async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update a product by ID
async function updateProduct(req, res) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a product by ID
async function deleteProduct(req, res) {
  try {
    const deletedProduct = await Product.findByIdAndRemove(
      req.params.productId
    );
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
