const express = require('express');
const router = express.Router();
const globals = require('../config/config');


router.get('/', (req, res) => {
    res.send(`Welcome, you are at the root of fit meals api... ${globals.templateGlobals["appName"]}`)
});

module.exports = router;

