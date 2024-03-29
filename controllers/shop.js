const Product = require('../models/Product');

exports.getIndex = (req, res, next) => {
    Product.find()
    .then(result => {
        res.render('shop/index', {
            prods: result,
            pageTitle: 'Shop',
            path: '/',
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
    });
}