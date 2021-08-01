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

queue.process('non-blocking', 5, (job, done) => {
  const start = Date.now();
  while (Date.now() < start + 10000) {
    // mimic a CPU intensive task that blocks the event loop
  }
  console.log('Background worker completed blocking job');
  done();
});
