import { Request, Response } from 'express';
import { EventJob } from 'lib/types/event-job';
import { z } from 'zod';

export const registerCategory = ({ eventQueue }: { eventQueue: any }) => {
  async function addJob(eventJob: EventJob) {
    await eventQueue.add(eventJob.type, eventJob, {
      removeOnComplete: 1000,
      removeOnFail: 3000,
    });
    await eventQueue.close();
  }

  return async (req: Request, res: Response) => {
    const { categoryName, billboardId } = req.body;

    const CategorySchema = z.object({
      categoryName: z.string(),
      billboardId: z.string(),
    });

    try {
      const validatedCategory = CategorySchema.parse({
        categoryName,
        billboardId,
      });
      const eventJob: EventJob = {
        streamId: 'Category',
        type: 'CategoryRegistered',
        data: validatedCategory,
      };

      await addJob(eventJob);
      res.json({ categoryName });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
