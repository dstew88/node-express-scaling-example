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

queue.process((job, done) => {
  const start = Date.now();
  const { time } = job.data;

  while (Date.now() < start + time) {
    // mimic a CPU intensive task that blocks the event loop
  }
  console.log('Background worker completed blocking job');
  done();
});
