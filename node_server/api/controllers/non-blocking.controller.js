const kue = require('kue');

const { REDIS_HOST, REDIS_PORT } = process.env;

const queue = kue.createQueue(
  {
    prefix: 'q',
    redis: {
      host: `${REDIS_HOST}`,
      port: REDIS_PORT,
    },
  },
);

const nonBlockingTask = (req, res, next) => {
  // non-blocking code here
  const nonBlockingJob = queue.create('non-blocking', {
    loops: 10000,
  })
    .removeOnComplete(true)
    .attempts(5)
    .backoff({ delay: 60 * 1000, type: 'exponential' })
    .save();

  nonBlockingJob.on('failed', (err) => {
    console.log('Job failed');
  });

  res.status(200).json({
    type: 'non-blocking',
    complete: true,
  });
  next();
};

module.exports = {
  nonBlockingTask,
};
