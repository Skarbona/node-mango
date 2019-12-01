const mongoose = require('mongoose');
const config = require('config');

const mongoOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};


const dbConnection = () => mongoose.connect(config.get('db'), mongoOptions)
    .then(() => console.log(`Connected to ${config.get('db')}`))
    .catch(e => console.log('cannot connect to MongoDb', e));

module.exports = dbConnection;




