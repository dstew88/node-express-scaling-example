const blockingTask = (req, res, next) => {
  const start = Date.now();
  while (Date.now() < start + 10000) {
    // mimic a CPU intensive task that blocks the event loop
  }
  console.log('Node server instance completed blocking job');

  res.status(200).json({
    type: 'blocking',
    complete: true,
  });
  next();
};

module.exports = {
  blockingTask,
};
