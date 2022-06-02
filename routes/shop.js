const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');
const cartController = require('../controllers/cart');
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', productsController.getProducts);

router.get('/cart', cartController.getCart);

router.get('/checkout');

module.exports = router;