const Product = require('../models/Product');
// const Order = require('../models/Order');

exports.getCart = (req, res, next) => {
    req.user
    .getCart()
    .then(products => {
        console.log(products);
        res.render('shop/cart', {
            pageTitle: 'Cart', 
            path: '/cart',
            products: products,
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
    req.user.getOrders({include: ['products']})
    .then(orders => {
        res.render('shop/orders', {
            pageTitle: 'Your Orders', 
            path: '/orders',
            orders: orders
        });
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
    let fetchedProducts;
    let fetchedCart;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        fetchedProducts = products;
        return req.user.createOrder()
    })
    .then(order => {
        order.addProducts(fetchedProducts.map(product => {
            product.orderProduct = {quantity: product.cartProduct.quantity};
            return product
        }));
    })
    .then(result => {
        return fetchedCart.setProducts(null);
    })
    .then(result => {
        res.redirect('/orders')
    })
    .catch(err => console.log(err));
};
