const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart', 
        path: '/cart',
    });
};

exports.addToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.fetch(productId, (product) => {
        Cart.addProduct(productId, product.price);
    }); 
    res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders', 
        path: '/orders',
    });
};