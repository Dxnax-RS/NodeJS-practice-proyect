const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products:[
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }, 
            quantity: {
                type: Number, 
                required: true
            } 
        }
    ]
})

orderSchema.methods.addOrder = function(user){
    this.user = user._id;
    user.cart.items.forEach(prod => {
        this.products.push({product: prod.productId, quantity: prod.quantity});
    })
    return this.save();
}

module.exports = mongoose.model('Order', orderSchema);