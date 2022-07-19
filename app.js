const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const exceptionsController = require('./controllers/exceptions');

const User = require('./models/User');

const { domainToASCII } = require('url');
const { userInfo } = require('os');

//Serverside middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("62d04b39f18f72d83a0ce910")
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

//Aplication paths middleware
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//Responce error middleware
app.use(exceptionsController.get404);

mongoose.connect('mongodb+srv://Dxnax:H4x81dgdew0ZPkl7@cluster0.gh1bazt.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: 'Daniel',
                email: 'daniel@email.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })
    app.listen(3000);
})
.catch(err => console.log(err));