import { Request, Response } from 'express';
import { EventJob } from '../../../types/event-job';
import { addJob } from '../../../utils/addJob';
import { z } from 'zod';

export const removeBillboard = ({ eventQueue }: any) => {
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

      await addJob({ eventQueue, eventJob });
      res.json({ billboardId });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
