const Product = require('../models/Product');

exports.getIndex = (req, res, next) => {
    const isAuthenticated = req
        .get('Cookie')
        .split('=')[0];
        
    Product.find()
    .then(result => {
        res.render('shop/index', {
            prods: result,
            pageTitle: 'Shop',
            path: '/',
            isAuthenticated: isAuthenticated
        });
    })
    .catch(err => {
        console.log(err);
    });
}