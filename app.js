const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const CartProduct = require('./models/Cart-Product');
const Order = require('./models/Order');
const OrderProduct = require('./models/Order-Product');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const exceptionsController = require('./controllers/exceptions');
const { domainToASCII } = require('url');

//Serverside middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
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

Product.belongsTo(User, {constrains: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartProduct});
Product.belongsToMany(Cart, {through: CartProduct});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderProduct});
Product.belongsToMany(Order, {through: OrderProduct});

sequelize
// .sync({force:true})
.sync()
.then(result => {
    return User.findByPk(1);
    //console.log(result);
})
.then(user => {
    if(!user){
        return User.create({name: 'Donitas', email: 'Eldonitas@email.com'});
    }
    return Promise.resolve(user);
})
.then(user => {
    return user.createCart();
})
.then(cart => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});