const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://Dxnax:H4x81dgdew0ZPkl7@cluster0.gh1bazt.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('CONNECTED-------------------')
        callback(client);
    })
    .catch(err => console.log(err));
}

module.exports = mongoConnect;