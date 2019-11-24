const mongoose = require('mongoose');

const mongoOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const dbConnection = mongoose.connect('mongodb://localhost/playground', mongoOptions)
    .then(() => console.log('connected to MongoDb...'))
    .catch(e => console.log('cannot connect to MongoDb', e));

module.exports = dbConnection;




