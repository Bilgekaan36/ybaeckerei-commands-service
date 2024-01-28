import { Request, Response } from 'express';
import { z } from 'zod';

export const editCustomer = () => {
  return async (req: Request, res: Response) => {
    const { customerId, firstName, lastName, email, phoneNumber } = req.body;

    const CustomerSchema = z.object({
      customerId: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      phoneNumber: z.number(),
    });

    try {
      const validatedCustomer = CustomerSchema.parse({
        customerId,
        firstName,
        lastName,
        email,
        phoneNumber,
      });
      // await store.editCustomer(validatedCustomer);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ customerId });
  };
};
