const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const Cart = require('./Cart');

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err){
            return cb([]);
        }
        return cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title;
        this.image = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        getProductsFromFile(products => {
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                products[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
            else{
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static delete(id){
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if(!err){
                    Cart.delete(id, product.price);
                }
            });
        });
    }

    static fetch(id, cb){
        getProductsFromFile((products) => {
            const product = products.find(p => p.id === id);
            return cb(product);
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}