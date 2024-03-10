import { EventJob } from '../types/event-job';

export async function addJob(props: { eventQueue: any; eventJob: EventJob }) {
  const { eventQueue, eventJob } = props;
  await eventQueue.add(eventJob.type, eventJob, {
    removeOnComplete: 1000,
    removeOnFail: 3000,
  });
  await eventQueue.close();
}
