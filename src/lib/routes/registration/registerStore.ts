import { Request, Response } from 'express';
import { z } from 'zod';

export const registerStore = () => {
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
      // await store.registerStore(validatedStore);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ storeTitle });
  };
};
