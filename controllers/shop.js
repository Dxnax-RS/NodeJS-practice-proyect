const Product = require('../models/Product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products, 
            pageTitle: 'Shop', 
            path: '/', 
        });
    });
}