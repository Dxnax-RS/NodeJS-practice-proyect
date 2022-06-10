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
    res.render('admin/edit-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        editing: false,
        product: []
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(null, title, image, description, price);
    product.save();
    res.redirect('/products');
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const productid = req.params.productId
    Product.fetch(productid, product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const title = req.body.title;
    const image = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(productId, title, image, description, price);
    product.save();
    res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.delete(productId);
    res.redirect('/admin/products');
};