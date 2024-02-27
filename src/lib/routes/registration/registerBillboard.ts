import { Request, Response } from 'express';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { EventJob } from 'lib/types/eventjob';

export const registerBillboard = ({ eventQueue }: { eventQueue: any }) => {
  async function addJob(eventJob: EventJob) {
    await eventQueue.add('BillboardRegistered', eventJob, {
      removeOnComplete: 1000,
      removeOnFail: 3000,
    });
    await eventQueue.close();
  }

  return async (req: Request, res: Response) => {
    const { billboardTitle, billboardImageUrl } = req.body;

    const BillboardSchema = z.object({
      billboardTitle: z.string(),
      billboardImageUrl: z.string(),
    });
    try {
      const validatedBillboard = BillboardSchema.parse({
        billboardTitle,
        billboardImageUrl,
      });
      const eventJob: EventJob = {
        streamId: 'Billboard',
        type: 'BillboardRegistered',
        data: validatedBillboard,
      };

      await addJob(eventJob);
      res.json({ billboardTitle });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
