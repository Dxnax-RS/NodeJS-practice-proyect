const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;

class User{
    constructor(username, email, cart, id){
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save(){
        const db = getDb();
        return db.collection('users').insertOne(this)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }

    getCart(){
        const db = getDb();
        let cartProductsPromises = [];

        this.cart.items.forEach(product => {
            cartProductsPromises.push(db.collection('products').findOne({_id: new mongodb.ObjectId(product.productId)})
            .then(prod => {
                return {...prod, quantity: product.quantity}
            })
            .catch(err => console.log(err)))
        });

        return Promise.all(cartProductsPromises)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
    }

    addToCart(product){
        const productInCartIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if(productInCartIndex >= 0){
            newQuantity = this.cart.items[productInCartIndex].quantity + 1;
            updatedCartItems[productInCartIndex].quantity = newQuantity;
        }
        else{
            updatedCartItems.push({productId: product._id, quantity: newQuantity})
        }

        const updatedCart = {items: updatedCartItems};
        const db = getDb();

        return db.collection('users').updateOne({_id: this._id}, {$set: {cart: updatedCart}});
    }

    deleteItemFromCart(productId){
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        });

        const db = getDb();
        return db.collection('users')
        .updateOne(
            {_id: new mongodb.ObjectId(this._id)}, 
            {$set: {cart: {items: updatedCartItems}}}
        );
    }

    getOrders(){
        const db = getDb();
        
        return db.collection('orders').find({'user._id': new mongodb.ObjectId(this._id)}).toArray();
    }

    addOrder(){
        const db = getDb();

        return this.getCart()
        .then(products => {
            const order = {
                user: {
                    _id: new mongodb.ObjectId(this._id),
                    name: this.name,
                    email: this.email
                },
                items: products
            }
            return db.collection('orders').insertOne(order);
        })
        .then(result => {
            this.cart = {items: []};
            return db.collection('users')
            .updateOne(
                {_id: new mongodb.ObjectId(this._id)}, 
                {$set: {cart: {items: []}}}
            );
        })
        .catch(err => console.log(err));
    }

    static findById(userId){
        const db = getDb();
        return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)})
        .then(user => {
            console.log(user);
            return user;
        })
        .catch(err => console.log(err));
    }
}

module.exports = User;