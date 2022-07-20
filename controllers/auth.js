exports.getLogin = (req, res, next) => {
    const isAuthenticated = req
        .get('Cookie')
        .split('=')[0];
    res.render('auth/login', {
        pageTitle: 'Login', 
        path: '/login',
        isAuthenticated: isAuthenticated
    });
};

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
};