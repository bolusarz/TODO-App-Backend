const express = require('express')
const winston = require("winston");
const config = require("./startup/config");

const app = express();

require('./startup/logging')();
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/validation')();
require('./startup/prod')(app);


app.listen(config.port, () => winston.info(`Listening on port ${config.port}...`));
