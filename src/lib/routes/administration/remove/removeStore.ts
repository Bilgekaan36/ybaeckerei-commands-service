import { Request, Response } from 'express';
import { EventJob } from '../../../types/event-job';
import { addJob } from '../../../utils/addJob';
import { z } from 'zod';

export const removeStore = ({ eventQueue }: any) => {
  return async (req: Request, res: Response) => {
    const { storeId } = req.body;

    const StoreSchema = z.object({
      storeId: z.string(),
    });

    try {
      const validatedStore = StoreSchema.parse({
        storeId,
      });
      const eventJob: EventJob = {
        streamId: 'Store',
        type: 'StoreRemoved',
        data: validatedStore,
      };

      await addJob({ eventQueue, eventJob });
      res.json({ storeId });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
