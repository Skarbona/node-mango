const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/validation')();
require('./startup/routes')(app);
require('./db/db')();
require('./startup/config')();

const port = process.env.PORT || 3004;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;