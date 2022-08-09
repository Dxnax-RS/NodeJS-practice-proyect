const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }, 
            quantity: {
                type: Number, 
                required: true
            } 
        }] 
    }
});

userSchema.methods.addToCart = function(product) {
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

    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.deleteItemFromCart = function(productId){
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.clearCart = function(){
    this.cart.items = [];
    return this.save();
}

module.exports = mongoose.model('User', userSchema);