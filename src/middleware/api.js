const express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');

router.use((req, res, next) => {
    next();
});


module.exports = router;