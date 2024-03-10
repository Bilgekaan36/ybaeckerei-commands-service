import { Request, Response } from 'express';
import { EventJob } from '../../types/event-job';
import { addJob } from '../../utils/addJob';
import { z } from 'zod';

export const registerStore = ({ eventQueue }: any) => {
  return async (req: Request, res: Response) => {
    const { storeTitle, street, postalCode, city } = req.body;

    const StoreSchema = z.object({
      storeTitle: z.string(),
      street: z.string(),
      postalCode: z.number(),
      city: z.string(),
    });

    try {
      const validatedStore = StoreSchema.parse({
        storeTitle,
        street,
        postalCode,
        city,
      });
      const eventJob: EventJob = {
        streamId: 'Store',
        type: 'StoreRegistered',
        data: validatedStore,
      };

      await addJob({ eventQueue, eventJob });
      res.json({ storeTitle });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
