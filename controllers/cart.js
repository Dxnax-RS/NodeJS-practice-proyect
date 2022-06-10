const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.getCart = (req, res, next) => {
    Cart.fetchAll(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products)
            {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if(cartProductData)
                {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Cart', 
                path: '/cart',
                products: cartProducts,
            });
        });
    })
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

exports.postDeleteFromCart = (req, res, next) => {
    const productId = req.body.productId;
    const price = req.body.price;
    Cart.delete(productId, price);
    res.redirect('/cart');
};