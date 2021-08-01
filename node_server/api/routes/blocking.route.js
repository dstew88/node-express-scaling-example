const express = require('express');

const router = express.Router();

const { blockingTask } = require('../controllers/blocking.controller');

router
  .route('/')
  .get(blockingTask);

module.exports = router;
