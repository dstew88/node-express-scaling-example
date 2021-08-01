const express = require('express');

const router = express.Router();

const { nonBlockingTask } = require('../controllers/non-blocking.controller');

router
  .route('/')
  .get(nonBlockingTask);

module.exports = router;
