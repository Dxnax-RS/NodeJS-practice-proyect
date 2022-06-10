const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/products', productsController.getAdminProducts);

router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

router.get('/edit-product/:productId', productsController.getEditProduct);

router.post('/edit-product', productsController.postEditProduct);

router.post('/delete-product', productsController.postDeleteProduct);

module.exports = router;