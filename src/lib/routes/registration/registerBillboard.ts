import { Request, Response } from 'express';
import { EventJob } from '../../types/event-job';
import { addJob } from '../../utils/addJob';
import { z } from 'zod';

export const registerBillboard = ({ eventQueue }: any) => {
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

      await addJob({ eventQueue, eventJob });
      res.json({ billboardTitle });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
