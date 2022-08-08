const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const mongoConnect = require('./util/database').mongoConnect;

const MONGODB_URI = 'mongodb+srv://Dxnax:H4x81dgdew0ZPkl7@cluster0.gh1bazt.mongodb.net/shop?retryWrites=true&w=majority'

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const exceptionsController = require('./controllers/exceptions');

const User = require('./models/User');

//Serverside middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my secret',
    resave: false, 
    saveUninitialized: false, 
    store: store
}));

app.use((req, res, next) => {
    if(req.session.isLoggedIn)
    {
        User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
    }
    else{
        next();
    }
});

//Aplication paths middleware
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

//Responce error middleware
app.use(exceptionsController.get404);

mongoose.connect(MONGODB_URI)
.then(result => {
    app.listen(3000);
})
.catch(err => console.log(err));