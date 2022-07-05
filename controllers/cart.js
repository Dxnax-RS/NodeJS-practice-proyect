const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

exports.getCart = (req, res, next) => {
    req.user
    .getCart()
    .then(cart => {
        return cart.getProducts()
        .then(products => {
            console.log(products);
            res.render('shop/cart', {
                pageTitle: 'Cart', 
                path: '/cart',
                products: products,
            });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.addToCart = (req, res, next) => {
    const productId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;

    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({where: {id: productId}});
    })
    .then(products => {
        let product;
        if(products.length > 0)
        {
            product = products[0];
        }
        if(product)
        {
            const oldQuantity = product.cartProduct.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return Product.findByPk(productId)
    })
    .then(product => {
        return fetchedCart.addProduct(product, {through: {quantity: newQuantity}})
    })
    .then(() => res.redirect('/cart'))
    .catch(err => console.log(err));
};

exports.postDeleteFromCart = (req, res, next) => {
    const productId = req.body.productId;
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({where: {id: productId}})
    })
    .then(products => {
        const product = products[0];
        return product.cartProduct.destroy();
    })
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
