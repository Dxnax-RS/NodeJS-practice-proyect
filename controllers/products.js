const Product = require('../models/Product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([products, fieldData]) => {
            res.render('shop/product-list', {
                prods: products, 
                pageTitle: 'Products List', 
                path: '/products', 
            });
        })
        .catch(err => console.log(err));
};

exports.getProductById = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetch(productId)
        .then(([product, fieldData]) => {
            res.render('shop/product-detail', {
                product: product[0], 
                pageTitle: product[0].title, 
                path: '/products', 
            });
        })
        .catch(err => console.log(err));
    
};

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([products, fieldData]) => {
            res.render('admin/products', {
                prods: products, 
                pageTitle: 'Products List', 
                path: '/admin/products', 
            });
        })
        .catch(err => console.log(err));
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
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(null, title, imageUrl, description, price);
    product.save()
        .then(() => {
            res.redirect('/products');
        })
        .catch(err => console.log(err));
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
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(productId, title, imageUrl, description, price);
    product.save();
    res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.delete(productId);
    res.redirect('/admin/products');
};