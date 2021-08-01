const bull = require('bull');

const { REDIS_HOST, REDIS_PORT } = process.env;

const queue = bull(
  'q',
  {
    redis: {
      host: `${REDIS_HOST}`,
      port: REDIS_PORT,
    },
  },
);

const nonBlockingTask = (req, res, next) => {
  // non-blocking code here
  queue.add(
    {
      time: 10000,
    },
    {
      attempts: 5,
    },
  );

  res.status(200).json({
    type: 'non-blocking',
    complete: true,
  });
  next();
};

module.exports = {
  nonBlockingTask,
};
