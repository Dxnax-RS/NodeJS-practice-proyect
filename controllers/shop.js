const Product = require('../models/Product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([products, fieldData]) => {
            res.render('shop/product-list', {
                prods: products, 
                pageTitle: 'Shop', 
                path: '/', 
            });
        })
        .catch(err => console.log(err));
}