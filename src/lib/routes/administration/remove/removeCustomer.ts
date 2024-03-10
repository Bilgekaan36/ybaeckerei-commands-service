import { Request, Response } from 'express';
import { EventJob } from '../../../types/event-job';
import { addJob } from '../../../utils/addJob';
import { z } from 'zod';

export const removeCustomer = ({ eventQueue }: any) => {
  return async (req: Request, res: Response) => {
    const { customerId } = req.body;

    const CustomerSchema = z.object({
      customerId: z.string(),
    });

    try {
      const validatedCustomer = CustomerSchema.parse({
        customerId,
      });
      const eventJob: EventJob = {
        streamId: 'Customer',
        type: 'CustomerRemoved',
        data: validatedCustomer,
      };

      await addJob({ eventQueue, eventJob });
      res.json({ customerId });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
