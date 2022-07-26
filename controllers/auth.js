const User = require('../models/User');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login', 
        path: '/login',
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    User.find({'email':req.body.email})
    .then(user => {
        console.log(user[0]);
        req.session.isLoggedIn = true;
        req.session.user = user[0];
        req.session.save(err => {
            console.log(err);
            res.redirect('/');
        });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
}