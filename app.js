const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const exceptionsController = require('./controllers/exceptions');

const User = require('./models/User');

const { domainToASCII } = require('url');

//Serverside middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("62cc573b15a07e592364ddd0")
    .then(user => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(err => console.log(err));
});

//Aplication paths middleware
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//Responce error middleware
app.use(exceptionsController.get404);

mongoConnect(() => {
    app.listen(3000);
});