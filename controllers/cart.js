const Product = require('../models/Product');
const Order = require('../models/Order');
// const Order = require('../models/Order');

exports.getCart = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .then(products => {
        console.log(products.cart.items);
        res.render('shop/cart', {
            pageTitle: 'Cart', 
            path: '/cart',
            products: products.cart.items,
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => console.log(err));
};

exports.addToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
    .then(product => {
        return req.user.addToCart(product);
    })
    .then(result => {
        console.log(result);
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postDeleteFromCart = (req, res, next) => {
    const productId = req.body.productId;
    req.user.deleteItemFromCart(productId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    Order.find({'user' : req.session.user._id})
    .populate('products.product')
    .then(orders => {
        console.log(orders[0].products);
        res.render('shop/orders', {
            pageTitle: 'Your Orders', 
            path: '/orders',
            orders: orders,
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
    const order = new Order;
    order.addOrder(req.user)
    .then(result => {
        return req.user.clearCart();
    })
    .then(result => {
        res.redirect('/orders')
    })
    .catch(err => console.log(err));
};
