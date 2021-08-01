const express = require('express');

const router = express.Router();

const blockingRoute = require('./blocking.route');
const nonblockingRoute = require('./non-blocking.route');

router.use('/blocking', blockingRoute);
router.use('/non-blocking', nonblockingRoute);

module.exports = router;
