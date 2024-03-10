import { Request, Response } from 'express';
import { EventJob } from '../../types/event-job';
import { addJob } from '../../utils/addJob';
import { z } from 'zod';

export const registerCustomer = ({ eventQueue }: any) => {
  return async (req: Request, res: Response) => {
    const { firstName, lastName, email, phoneNumber } = req.body;

    const CustomerSchema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      phoneNumber: z.number(),
    });

    try {
      const validatedCustomer = CustomerSchema.parse({
        firstName,
        lastName,
        email,
        phoneNumber,
      });
      const eventJob: EventJob = {
        streamId: 'Customer',
        type: 'CustomerRegistered',
        data: validatedCustomer,
      };

      await addJob({ eventQueue, eventJob });
      res.json({ firstName, lastName });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
