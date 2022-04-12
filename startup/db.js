const winston = require('winston');
const mongoose = require('mongoose');

const config = require('./config');

module.exports = () => {
    mongoose.connect(config.mongo.uri)
        .then(() => winston.info('Connected to MongoDB...'))
}
