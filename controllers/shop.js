exports.getIndex = (req, res, next) => {
    res.render('shop/index', {
        pageTitle: 'Shop', 
        path: '/',
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true
    })
}