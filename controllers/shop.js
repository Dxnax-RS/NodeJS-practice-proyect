const Product = require('../models/Product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(result => {
        res.render('shop/index', {
            prods: result,
            pageTitle: 'Shop',
            path: '/'
        });
    })
    .catch(err => {
        console.log(err);
    });
}