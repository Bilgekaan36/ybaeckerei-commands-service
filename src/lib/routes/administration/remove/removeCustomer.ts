import { Request, Response } from 'express';
import { z } from 'zod';

export const removeCustomer = () => {
  return async (req: Request, res: Response) => {
    const { customerId } = req.body;

    const CustomerSchema = z.object({
      customerId: z.string(),
    });

    try {
      const validatedCustomer = CustomerSchema.parse({
        customerId,
      });
      // await store.removeCustomer(validatedCustomer);
    } catch (err: any) {
      return res.status(400).end();
    }
    res.json({ customerId });
  };
};
