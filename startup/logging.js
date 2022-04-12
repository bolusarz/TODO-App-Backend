require('winston-mongodb');
require('express-async-errors');

const winston = require('winston');
const config = require('./config');

module.exports = () => {
    winston.add(new winston.transports.File({filename: 'report.log'}));
    winston.exceptions.handle(
        new winston.transports.File({filename: 'expections.log'}),
        new winston.transports.Console({colorize: true, prettyPrint: true})
    );

    winston.add(new winston.transports.MongoDB({
        db: config.mongo.uri,
        level: 'info'
    }));
}
