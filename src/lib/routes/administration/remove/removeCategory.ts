import { Request, Response } from 'express';
import { EventJob } from 'lib/types/event-job';
import { z } from 'zod';

export const removeCategory = ({ eventQueue }: { eventQueue: any }) => {
  async function addJob(eventJob: EventJob) {
    await eventQueue.add(eventJob.type, eventJob, {
      removeOnComplete: 1000,
      removeOnFail: 3000,
    });
    await eventQueue.close();
  }

  return async (req: Request, res: Response) => {
    const { categoryId } = req.body;

    const CategorySchema = z.object({
      categoryId: z.string(),
    });

    try {
      const validatedCategory = CategorySchema.parse({
        categoryId,
      });
      const eventJob: EventJob = {
        streamId: 'Category',
        type: 'CategoryRemoved',
        data: validatedCategory,
      };

      await addJob(eventJob);
      res.json({ categoryId });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
