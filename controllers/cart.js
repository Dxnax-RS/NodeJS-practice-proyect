exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart', 
        path: '/cart',
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true
    })
}