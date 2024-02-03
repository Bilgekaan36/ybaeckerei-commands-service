import { Request, Response } from 'express';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

export const registerBillboard = ({ eventQueue }: { eventQueue: any }) => {
  return async (req: Request, res: Response) => {
    const { billboardTitle, billboardImageUrl } = req.body;

    const BillboardSchema = z.object({
      billboardTitle: z.string(),
      billboardImageUrl: z.string(),
    });
    async function addJob(event: any) {
      await eventQueue.add('BillboardRegistered', event, {
        removeOnComplete: 1000,
        removeOnFail: 3000,
      });
      await eventQueue.close();
    }
    try {
      const validatedBillboard = BillboardSchema.parse({
        billboardTitle,
        billboardImageUrl,
      });
      const event = {
        streamId: 123,
        type: 'BillboardRegistered',
        data: validatedBillboard,
      };

      await addJob(event);
      res.json({ billboardTitle });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
