import { Request, Response } from 'express';
import { z } from 'zod';

export const registerCustomer = () => {
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
      // await store.registerCustomer(validatedCustomer);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ firstName, lastName });
  };
};
