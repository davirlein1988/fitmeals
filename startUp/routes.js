const express = require('express');
const home = require('../routes/home');
const users = require('../routes/users');




module.exports = function(app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/users', (req, res) => {
        res.send(users);
    });
}
