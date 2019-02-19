const winston = require('winston');
const config = require('./config/config'); 
const express = require('express');
const app = express();
require('./startUp/routes')(app);


const port = config.httpPort;
app.listen(port, ()=> {
    winston.info(`Server listening on port ${port}...`);
});