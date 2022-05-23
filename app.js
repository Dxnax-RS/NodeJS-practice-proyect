const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//Serverside middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//Aplication paths middleware
app.use('/admin', adminData.routes);
app.use(shopRoutes);

//Responce error middleware
app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen(3000);