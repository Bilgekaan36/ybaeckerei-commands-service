import { Request, Response } from 'express';
import { EventJob } from 'lib/types/event-job';
import { z } from 'zod';

export const removeBillboard = ({ eventQueue }: { eventQueue: any }) => {
  async function addJob(eventJob: EventJob) {
    await eventQueue.add(eventJob.type, eventJob, {
      removeOnComplete: 1000,
      removeOnFail: 3000,
    });
    await eventQueue.close();
  }

  return async (req: Request, res: Response) => {
    const { billboardId } = req.body;
    const BillboardSchema = z.object({
      billboardId: z.string(),
    });

    try {
      const validatedBillboard = BillboardSchema.parse({
        billboardId,
      });
      const eventJob: EventJob = {
        streamId: 'Billboard',
        type: 'BillboardRemoved',
        data: validatedBillboard,
      };

      await addJob(eventJob);
      res.json({ billboardId });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
