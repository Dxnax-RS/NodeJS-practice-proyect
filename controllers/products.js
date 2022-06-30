const Product = require('../models/Product');

exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/product-list', {
            prods: products, 
            pageTitle: 'Products List', 
            path: '/products', 
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getProductById = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByPk(productId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product, 
                pageTitle: product.title, 
                path: '/products', 
            });
        })
        .catch(err => console.log(err));
    
};

exports.getAdminProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Products List', 
            path: '/admin/products', 
        });
    })
    .catch(err => {
        console.log(err);
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
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    }).then(result => {
        console.log(result);
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const productid = req.params.productId
    Product.findByPk(productid)
    .then(product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;
    Product.findByPk(productId)
    .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDescription;
        product.price = updatedPrice;
        return product.save();
    })
    .then(result => {
        console.log("updated product")
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findByPk(productId)
    .then(product => {
        return product.destroy();
    })
    .then(resutl => {
        console.log("Product destroyed")
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};