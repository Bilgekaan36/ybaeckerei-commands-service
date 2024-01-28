import { Request, Response } from 'express';
import { z } from 'zod';

export const editStore = () => {
  return async (req: Request, res: Response) => {
    const {
      storeId,
      storeTitle,
      streetName,
      streetNumber,
      postalCode,
      state,
      city,
    } = req.body;

    const StoreSchema = z.object({
      storeId: z.string(),
      storeTitle: z.string(),
      streetName: z.string(),
      streetNumber: z.number(),
      postalCode: z.number(),
      state: z.string(),
      city: z.string(),
    });

    try {
      const validatedStore = StoreSchema.parse({
        storeId,
        storeTitle,
        streetName,
        streetNumber,
        postalCode,
        state,
        city,
      });
      // await store.editStore(validatedStore);
    } catch (err: any) {
      return res.status(400).end();
    }
    res.json({ storeId });
  };
};
