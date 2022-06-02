const Product = require('../models/Product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products, 
            pageTitle: 'Products List', 
            path: '/products', 
            activeShop: true,
            productCSS: true
        });
    });
};

exports.getAdminProducts = (req, res, next) => {
    res.render('admin/products', {
        pageTitle: 'Admin Products', 
        path: '/admin/products',
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true
    })
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true
    })
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('admin/products');
};