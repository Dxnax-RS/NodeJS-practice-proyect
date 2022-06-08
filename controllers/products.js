const Product = require('../models/Product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products, 
            pageTitle: 'Products List', 
            path: '/products', 
        });
    });
};

exports.getProductById = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetch(productId, (product) => {
        res.render('shop/product-detail', {
            product: product, 
            pageTitle: product.title, 
            path: '/products', 
        });
    });
};

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Products List', 
            path: '/admin/products', 
        });
    });
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(title, image, description, price);
    product.save();
    res.redirect('/products');
};