const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart{
    static addProduct(id, productPrice){
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0}
            if(!err){
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            
            if(existingProductIndex !== -1){
                cart.products[existingProductIndex].qty += 1;
            } else {
                cart.products.push({ id: 1, qty: 1 });
            }
            cart.totalPrice += +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    };
}