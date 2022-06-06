const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/products', productsController.getAdminProducts);

router.get('/add-product', productsController.getAddProduct);

router.get('/edit-product');

router.post('/add-product', productsController.postAddProduct);

router.post('/edit-product');

module.exports = router;