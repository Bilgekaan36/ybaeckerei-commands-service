import { flaschenpost } from 'flaschenpost';
import { getApi } from './lib/getApi';
import http from 'http';
import { PORT } from './configs';
import { Queue } from 'bullmq';
import { redisConnection } from './redis-connection';

(async () => {
  const logger = flaschenpost.getLogger();

  // Reuse the ioredis instance
  const eventQueue = new Queue('eventqueue', {
    connection: redisConnection,
  });

  // Clean or reset the queue (remove all data)
  async function resetQueue() {
    await eventQueue.obliterate();
    console.log('The queue has been reset.');
  }
  // Call the resetQueue function to reset the queue
  resetQueue();

  const api = getApi({ eventQueue });
  const server: any = http.createServer(api);

  server.listen(PORT, () => {
    logger.info('Server started.', { PORT });
  });
})();
