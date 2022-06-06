exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart', 
        path: '/cart',
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders', 
        path: '/orders',
    })
}