const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.route('/').get(getAllProducts);
router.route('/').post(createProduct);
router.route('/:productId').get(getProductById);
router.route('/:productId').put(updateProduct);
router.route('/:productId').delete(deleteProduct);

module.exports = router;
