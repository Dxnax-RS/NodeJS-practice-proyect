exports.get404 = (req, res, next) => {
    const isAuthenticated = req
        .get('Cookie')
        .split('=')[0];
        
    res.status(404).render('404', {
        pageTitle: 'Page Not Found', 
        path: "", 
        isAuthenticated: isAuthenticated
    });
};